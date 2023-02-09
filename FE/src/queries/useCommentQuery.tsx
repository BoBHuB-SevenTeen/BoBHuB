import * as API from '../api/API';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Tcomment } from '../type/commentType';

const fetchComments = async (shopId: number) => {
  try {
    const res = await API.get(`/api/comments?shopId=${shopId}`);
    if (!res) {
      throw new Error('데이터를 받아오지 못했습니다.');
    }
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const useCommentQuery = (shopId: number) => {
  return useQuery<Tcomment[], AxiosError>(['comment', shopId], () => fetchComments(shopId));
};
