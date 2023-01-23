import { NullableString } from './utilType';

export type Menu = {
  foodId: number;
  shopId: number;
  picture: NullableString;
  name: string;
  price: number;
  createdAt: NullableString;
  updatedAt: NullableString;
  deletedAt: NullableString;
};
