import { useMutation, useQueryClient } from '@tanstack/react-query';
import { changeRole } from '../api/changeRole';
import { MemberType } from '@/shared/types/memberType';
import { MemberRole } from '@/shared/const/role';

export const useChangeRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, role }: { id: string; role: MemberRole }) =>
      changeRole(id, role),
    onMutate: async ({ id, role }) => {
      await queryClient.cancelQueries({ queryKey: ['members'] });

      const previousMembers = queryClient.getQueryData<MemberType[]>([
        'members',
      ]);

      queryClient.setQueryData<MemberType[]>(['members'], (old = []) =>
        old.map((member) =>
          member.memberId === id ? { ...member, role } : member,
        ),
      );

      return { previousMembers };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousMembers) {
        queryClient.setQueryData(['members'], context.previousMembers);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
    },
  });
};
