import * as API from '../../api/API';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Tcomment } from '../../type/commentType';

const fetchComments = async (shopId: number) => {
  return await API.get(`/api/comments?shopId=${shopId}`);
};

export const useCommentQuery = (shopId: number) => {
  const {
    isLoading: isCommentLoading,
    isError: isCommentError,
    data: commentState,
    isSuccess,
  } = useQuery<Tcomment[], AxiosError>(['comment', shopId], () => fetchComments(shopId), {
    suspense: true,
  });

  return { isCommentLoading, isCommentError, commentState, isSuccess };
};
