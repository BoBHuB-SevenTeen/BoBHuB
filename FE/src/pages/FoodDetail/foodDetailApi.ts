import * as API from '../../api/API';
import { PostComment } from '../../type/commentType';
import { PostParty } from '../../type/partyType';

export const getShop = async (shopId: number) => await API.get(`/api/shops/${shopId}`);

export const getMenu = async (shopId: number) => await API.get(`/api/food?shopId=${shopId}`);

export const postComment = async (comment: PostComment) => {
  return await API.post('/api/comments', comment);
};

export const patchComment = async (comment: PostComment, commentId: number) => {
  const res = await API.patch(`/api/comments/${commentId}`, comment);
  console.log(res);
};

export const deleteComment = async (commentId: number) => {
  const res = await API.delete(`/api/comments/${commentId}`);
  console.log(res);
};

export const postParty = async (party: PostParty) => {
  const message = await API.post(`/api/parties`, party);
  return message;
};
