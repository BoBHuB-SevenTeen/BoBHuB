import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as API from '../../api/API';

export const deleteComment = async (commentId: number) => {
  return await API.delete(`/api/comments/${commentId}`);
};

type UseCreateComment = {
  onSuccessCb: () => void;
  onErrorCb: () => void;
  shopId: number | undefined;
};

export const useDeleteComment = ({ onSuccessCb, onErrorCb, shopId }: UseCreateComment) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comment', shopId], { exact: true });
      onSuccessCb();
    },
    onError: () => {
      onErrorCb();
    },
  });

  return { mutation };
};
