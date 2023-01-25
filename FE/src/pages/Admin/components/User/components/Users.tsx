import UserTable from './UserTable';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { getUsersData } from './../../../../../store/adminUsersSlice';
import { AppDispatch } from '../../../../../store/store';

const Users = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getUsersData());
  }, []);

  return (
    <Div>
      <H2>유저 조회</H2>
      <UserTable />
    </Div>
  );
};

export default Users;

const Div = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const H2 = styled.h2`
  margin-bottom: 50px;
  margin-top: 50px;
`;
