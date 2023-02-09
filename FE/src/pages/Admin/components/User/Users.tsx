import UserTable from './components/UserTable';
import styled from 'styled-components';

const Users = () => {
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
