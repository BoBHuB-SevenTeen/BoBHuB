import { useQueries } from '@tanstack/react-query';
import { get } from '../../api/API';
import { Party } from '../../pages/MainPage/Type';
import { LikedNum } from '../../type/partyType';

function getPartyIdLikedNumMap(data: any[]): Map<number, number> {
  return data.reduce((result, item) => {
    const { partyId, likedNum } = item;
    result.set(partyId, likedNum);
    return result;
  }, new Map<number, number>());
}

const getLikedNum = async (partyId: number): Promise<LikedNum> => {
  try {
    const res = await get(`/api/parties/${partyId}/likedNum`);
    return res;
  } catch (err) {
    throw new Error('서버에서 데이터를 받아오는데 실패했습니다.');
  }
};

export const useLikedNumArr = (parties: Party[] | undefined) => {
  const queriesResponse = useQueries({
    queries: parties
      ? parties.map((party) => {
          return {
            queryKey: ['parties', 'likedNum', party.partyId],
            queryFn: () => getLikedNum(party.partyId),
          };
        })
      : [],
  });

  const filteredResponses = queriesResponse?.filter((res) => res.isSuccess && res.data);
  const partyIdLikedNumMap = getPartyIdLikedNumMap(filteredResponses?.map((res) => res.data));

  return partyIdLikedNumMap;
};
