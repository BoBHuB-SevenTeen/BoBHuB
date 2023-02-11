import * as API from '../../api/API';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Tcomment } from '../../type/commentType';

export const fetchComments = async (shopId: number) => {
  return await API.get(`/api/comments?shopId=${shopId}`);
};

export const useCommentQuery = (shopId: number) => {
  return useQuery<Tcomment[], AxiosError>(['comment', shopId], () => fetchComments(shopId));
}; // 에러타입 명시해줘야함.
