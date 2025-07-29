import { useMutation, useQueryClient } from '@tanstack/react-query';
import { changeStatus } from '../api/changeStatus';
import { MEMBER_STATUS, MemberType } from '../types/memberType';

export const useChangeStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: MEMBER_STATUS }) =>
      changeStatus(id, status),
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: ['members'] });

      const previousMembers = queryClient.getQueryData<MemberType[]>([
        'members',
      ]);

      queryClient.setQueryData<MemberType[]>(['members'], (old = []) =>
        old.map((member) =>
          member.memberId === id ? { ...member, status } : member,
        ),
      );

      return { previousMembers };
    },
    onError: (err, variables, context) => {
      if (context?.previousMembers) {
        queryClient.setQueryData(['members'], context.previousMembers);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
    },
  });
};
