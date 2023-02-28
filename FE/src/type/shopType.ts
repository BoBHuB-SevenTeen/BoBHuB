import { NullableString } from './utilType';

type Food = {
  name: string;
  price: number;
  picture: string;
};

export type Shops = {
  shopId: number;
  category: string;
  name: string;
  distance: number;
  address: string;
  menu: NullableString;
  food?: Food[];
  shopPicture: NullableString;
  like: number;
  description: string;
  createdAt: NullableString;
  updatedAt: NullableString;
  deletedAt: NullableString;
};
