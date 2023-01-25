import { NullableString } from './utilType';

export type User = {
  userId: number;
  generation: number;
  track: string;
  name: string;
  nickname: string;
  email: string;
  phone: string;
  profile: NullableString;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: NullableString;
  deletedAt: NullableString;
};
