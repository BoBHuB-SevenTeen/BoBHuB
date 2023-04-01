import { useEffect, useState, useContext } from 'react';
import { SocketContext } from '../../../socket/SocketContext';
import type { Party } from '../../../pages/MainPage/Type';
import * as S from '../styles/chatListStyle';
import { Title } from '../styles/chatStyle';
import useUser from './../../../queries/useUserQuery';
import useMyParties from './../../../queries/useMyPartiesQuery';
import { useLikedNumArr } from '../../../queries/party/useLikedNumArr';

interface ChatListProps {
  moveRoom: (x: string) => void;
}

const ChatList = ({ moveRoom }: ChatListProps) => {
  const socket = useContext(SocketContext);
  const { data: user, isSuccess: isUserSuccess } = useUser();
  const { data: myPartyList, isSuccess: isPartiesSuccess } = useMyParties();
  const [completedParty, setCompletedParty] = useState<Party[]>([]);
  const res = useLikedNumArr(myPartyList);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { roomname, partyid } = e.currentTarget.dataset;
    socket.emit('enterRoom', roomname, partyid, moveRoom);
  };

  useEffect(() => {
    if (isUserSuccess && isPartiesSuccess) {
      socket.emit('nickname', user.name);

      setCompletedParty(myPartyList.filter((party) => party.partyLimit === res.get(party.partyId)));
    }

    // 실제 room이 만들어진걸 확인함.
  }, [user, isUserSuccess, isPartiesSuccess, myPartyList, socket]);

  return (
    <>
      <Title>Chat Lists</Title>
      <S.ChatContainer>
        {!isUserSuccess ? (
          <S.CursorDiv>"로그인을 해주세요"</S.CursorDiv>
        ) : completedParty.length === 0 ? (
          <S.CursorDiv>생성된 채팅방이 없습니다.</S.CursorDiv>
        ) : (
          completedParty.map((party) => (
            <>
              <S.CursorDiv
                onClick={handleMove}
                key={party.partyId}
                data-roomname={party.name}
                data-partyid={party.partyId}>
                {party.name}
              </S.CursorDiv>
            </>
          ))
        )}
      </S.ChatContainer>
    </>
  );
};

export default ChatList;
