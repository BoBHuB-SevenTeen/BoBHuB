import * as S from './MyParty.style';
import { delete as del } from '../api/API';
import { getLimitTime } from '../util/getLimitTime';
import { SocketContext } from '../socket/SocketContext';
import { useContext, useEffect } from 'react';
import useMyParties from '../queries/useMyPartiesQuery';
import useUser from '../queries/useUserQuery';
import { isFullParty } from '../util/isFullParty';
import { useQueryClient } from '@tanstack/react-query';

interface MyPartyProps {
  open: boolean;
  handleClose: () => void;
}

const MyParty = ({ open, handleClose }: MyPartyProps) => {
  const socket = useContext(SocketContext);
  const { data: myPartyList, isSuccess: fetchingMyPartiesSuccess } = useMyParties();
  const { data: user, isSuccess: fetchingUserSuccess } = useUser();
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

  const clickLeaveButton = (partyId: number) => {
    socket.emit('leaveParty', partyId, fetchingUserSuccess && user.userId);
  };

  const clickDeleteButton = async (id: number) => {
    const res = await del(`/api/parties/${id}`);
    socket.emit('deleteParty', '모임삭제');
  };

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
          myPartyList.map((party) => {
            // UTC 기준 시간 > 한국시간으로 변경
            const limit = getLimitTime(party.createdAt, party.timeLimit);
            return (
              <S.List key={party.partyId}>
                <S.NoPadFlex>
                  <S.BasicLink to={`/foodlist/${party.shopId}`}>
                    <S.ImgWrapper>
                      <S.Img src={party.shopPicture} alt="img" />
                    </S.ImgWrapper>
                  </S.BasicLink>
                  <S.Description>
                    <S.BasicLink to={`/foodlist/${party.shopId}`}>
                      <S.Name>{party.name}</S.Name>
                    </S.BasicLink>
                    <S.Paragraph>
                      모집 현황 {party.likedNum}/{party.partyLimit}
                    </S.Paragraph>
                  </S.Description>
                </S.NoPadFlex>
                {/* 배포환경에서 주석풀어야 합니다. */}
                {/* {user.userId === party.userId && isFullParty(party) && (
                <S.DeleteButton
                  size="small"
                  color="error"
                  variant="outlined"
                  onClick={() => clickDeleteButton(party.partyId)}>
                  모집 종료
                </S.DeleteButton>
              )}
              {user.userId !== party.userId && isFullParty(party) && (
                <S.DeleteButton onClick={() => clickLeaveButton(party.partyId)}>
                  참여 취소
                </S.DeleteButton>
              )} */}

                {/* 개발 환경에서만 사용 */}
                {fetchingUserSuccess && user.userId === party.userId && (
                  <S.DeleteButton
                    size="small"
                    color="error"
                    variant="outlined"
                    onClick={() => clickDeleteButton(party.partyId)}>
                    모집 종료
                  </S.DeleteButton>
                )}
                {fetchingUserSuccess && user.userId !== party.userId && (
                  <S.DeleteButton onClick={() => clickLeaveButton(party.partyId)}>
                    참여 취소
                  </S.DeleteButton>
                )}
                {isFullParty(party) && <S.Complete>모집 완료</S.Complete>}
              </S.List>
            );
          })}
      </S.ListWrapper>
    </S.Container>
  );
};

export default MyParty;
