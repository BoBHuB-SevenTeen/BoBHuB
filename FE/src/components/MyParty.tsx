import * as S from './MyParty.style';
import { SocketContext } from '../socket/SocketContext';
import { useContext, useEffect } from 'react';
import useMyParties from '../queries/useMyPartiesQuery';
import useUser from '../queries/useUserQuery';
import { useQueryClient } from '@tanstack/react-query';
import MyPartyItem from './MyPartyItem';

interface MyPartyProps {
  open: boolean;
  handleClose: () => void;
}

const MyParty = ({ open, handleClose }: MyPartyProps) => {
  const socket = useContext(SocketContext);
  const { data: myPartyList, isSuccess: fetchingMyPartiesSuccess } = useMyParties();
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.on('joinSuccess', () => {
      queryClient.invalidateQueries(['parties']);
    });
    socket.on('leaveSuccess', () => {
      queryClient.invalidateQueries(['parties']);
    });
    socket.on('createSuccess', () => {
      queryClient.invalidateQueries(['parties']);
    });
    socket.on('deleteSuccess', () => {
      queryClient.invalidateQueries(['parties']);
    });
  }, []);

  return (
    <S.Container open={open}>
      <S.Div>
        <S.Bar>
          <S.H3>찜 목록</S.H3>
          <S.CloseButton onClick={handleClose}>
            <S.Close />
          </S.CloseButton>
        </S.Bar>
      </S.Div>
      <S.ListWrapper>
        {fetchingMyPartiesSuccess && myPartyList.length === 0 && (
          <S.List>참여중인 모임이 없습니다.</S.List>
        )}
        {fetchingMyPartiesSuccess &&
          myPartyList.map((party) => <MyPartyItem key={party.partyId} party={party} />)}
      </S.ListWrapper>
    </S.Container>
  );
};

export default MyParty;
