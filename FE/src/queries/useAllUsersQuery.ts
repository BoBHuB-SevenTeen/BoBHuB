import { useQuery } from '@tanstack/react-query';
import { get } from '../api/API';
import { User } from '../type/userType';

const getUsers = async (): Promise<User[]> => {
  try {
    const res = await get('/api/admin/users');
    return res;
  } catch (err) {
    console.log(err);
    console.error(err);
    throw new Error('서버에서 데이터를 받아오는데 실패했습니다.');
  }
};

export default function useAllUsers() {
  return useQuery(['allUsers'], getUsers);
}
