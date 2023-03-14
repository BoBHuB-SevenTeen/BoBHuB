import { useQuery } from '@tanstack/react-query';
import { get } from '../../api/API';
import type { LikedNum } from '../../type/partyType';

const getLikedNum = async (partyId: number): Promise<LikedNum> => {
  try {
    const res = await get(`/api/parties/${partyId}/likedNum`);
    return res;
  } catch (err) {
    throw new Error('서버에서 데이터를 받아오는데 실패했습니다.');
  }
};

export const useLikedNum = (partyId: number) => {
  const {
    isError,
    isLoading,
    data: likedNum,
    isSuccess,
  } = useQuery(['parties', 'likedNum', partyId], () => getLikedNum(partyId));
  return { isError, isLoading, likedNum, isSuccess };
};
