export type NullableString = string | null;
export type NullableNum = number | null;

export const initialShopState = {
  shopId: 0,
  category: '',
  name: '',
  distance: 0,
  address: '',
  menu: '',
  shopPicture: '',
  like: 0,
  description: '',
  createdAt: '',
  updatedAt: '',
  deletedAt: '',
};

export const initialShops = {
  name: '',
  category: '',
  description: '',
  food: [{ name: '', picture: '' }],
  avgStar: 0,
  shopId: 0,
};

export type ProfilerProps = {
  id: string;
  phase: string;
  actualTime: number;
  baseTime: number;
  startTime: number;
  commitTime: number;
};
