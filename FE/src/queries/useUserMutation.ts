import { patch } from '../api/API';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const updateUserData = (userId: number, body: { nickname: string; role: string }) => {
  return patch(`/api/admin/users/${userId}`, body);
};

export default function useUserMutation() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ userId, body }: { userId: number; body: { nickname: string; role: string } }) =>
      updateUserData(userId, body),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['allUsers']);
      },
    },
  );
}
