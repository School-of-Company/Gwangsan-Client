import { useMutation, useQueryClient } from '@tanstack/react-query';
import { changeRole } from '../api/changeRole';
import { MemberType } from '@/shared/types/memberType';
import { MemberRole } from '@/shared/const/role';
import { toast } from 'sonner';

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
    onError: (err, _variables, context) => {
      if (context?.previousMembers) {
        queryClient.setQueryData(['members'], context.previousMembers);
      }
      toast.error(err.message ?? '역할 변경에 실패했습니다.');
    },
    onSuccess: () => {
      toast.success('역할이 변경되었습니다.');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
    },
  });
};
