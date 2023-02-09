import { useQuery } from '@tanstack/react-query';
import { get } from '../api/API';
import { Party } from '../pages/MainPage/Type';

const getMyPartyList = async (): Promise<Party[]> => {
  try {
    const res = await get('/api/parties/liked-party');
    return res;
  } catch (err) {
    throw new Error('서버에서 데이터를 받아오는데 실패했습니다.');
  }
};

export default function useMyParties() {
  return useQuery(['parties', 'my'], getMyPartyList);
}
