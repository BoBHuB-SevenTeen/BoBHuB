import { NullableNum, NullableString } from './utilType';

export interface PostComment {
  shopId?: number;
  content: string;
  star: NullableNum;
}

export interface Comment extends PostComment {
  userId: number;
  commentId: number;
  createdAt: NullableString;
  updatedAt: NullableString;
  deletedAt: NullableString;
  nickname: string;
  profile: NullableString;
}
