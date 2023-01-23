import { NullableString } from './utilType';

export type Shops = {
  shopId: number;
  category: string;
  name: string;
  distance: number;
  address: string;
  menu: NullableString;
  shopPicture: NullableString;
  like: number;
  description: string;
  createdAt: NullableString;
  updatedAt: NullableString;
  deletedAt: NullableString;
};
