import { useQuery } from 'react-query';
import { get } from '../api/API';
import { User } from '../type/userType';

const getUsers = async () => {
  try {
    const res = await get('/api/admin/users');
    console.log(res);
    if (!res) {
      throw new Error('데이터를 받아오지 못했습니다.');
    }
    return res;
  } catch (err) {
    console.log(err);
  }
};

export default function useAllUsers() {
  return useQuery<User[]>('allUsers', getUsers);
}
