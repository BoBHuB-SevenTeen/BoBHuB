import { useQuery } from '@tanstack/react-query';
import { get } from '../api/API';
import { Party } from '../pages/MainPage/Type';

const getActivePartyList = async (): Promise<Party[]> => {
  try {
    const parties: Party[] = await get('/api/parties');
    return parties;
  } catch (err) {
    throw new Error('서버에서 데이터를 받아오는데 실패했습니다.');
  }
};

export default function useActiveParties() {
  return useQuery(['parties', 'active'], getActivePartyList);
}
