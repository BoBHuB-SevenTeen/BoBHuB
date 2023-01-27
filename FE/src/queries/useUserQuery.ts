import { useQuery } from 'react-query';
import { get } from '../api/API';
import { User } from '../type/userType';

const loginUserData = async (): Promise<User> => {
  try {
    const res = await get('/api/users');
    return res;
  } catch (error) {
    console.error(error);
    throw new Error('서버에서 데이터를 받아오는데 실패했습니다.');
  }
};

export default function useUser() {
  return useQuery(['user'], loginUserData);
}
