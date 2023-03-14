import { Party } from '../pages/MainPage/Type';

export const isFullParty = (likedNum: number, limitNum: number) => {
  return likedNum === limitNum;
};
