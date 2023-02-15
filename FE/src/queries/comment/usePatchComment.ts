import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as API from '../../api/API';
import { PostComment } from '../../type/commentType';

type PatchComment = {
  comment: PostComment;
  commentId: number;
};

const patchComment = async ({ comment, commentId }: PatchComment) => {
  return await API.patch(`/api/comments/${commentId}`, comment);
};

type UsePatchComment = {
  onSuccessCb: () => void;
  onErrorCb: () => void;
  shopId: number | undefined;
};

export const usePatchComment = ({ onSuccessCb, onErrorCb, shopId }: UsePatchComment) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(patchComment, {
    onSuccess: () => {
      onSuccessCb();
      queryClient.invalidateQueries(['comment', shopId], { exact: true });
    },
    onError: () => {
      onErrorCb();
    },
  });

  return { mutation };
};
