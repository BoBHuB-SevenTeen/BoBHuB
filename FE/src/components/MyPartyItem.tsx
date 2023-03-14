import { Fragment, useContext, useState, useEffect } from 'react';
import { Party } from '../pages/MainPage/Type';
import useUser from '../queries/useUserQuery';
import { SocketContext } from '../socket/SocketContext';
import { isFullParty } from '../util/isFullParty';
import { useLikedNum } from './../queries/party/useLikedNum';
import * as S from './MyParty.style';
import { delete as del } from '../api/API';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const MyPartyItem = ({ party }: { party: Party }) => {
  const partyId = party.partyId;
  const socket = useContext(SocketContext);
  const [alarm, setAlarm] = useState(false);
  const closeAlarm = () => setAlarm(false);
  const { likedNum } = useLikedNum(partyId);
  const { data: user, isSuccess: fetchingUserSuccess } = useUser();

  useEffect(() => {
    if (likedNum && isFullParty(likedNum.likedNum, party.partyLimit)) {
      setAlarm(true);
    }
  }, [likedNum]);

  const clickLeaveButton = (partyId: number) => {
    socket.emit('leaveParty', partyId, fetchingUserSuccess && user.userId);
  };

  const clickDeleteButton = async (id: number) => {
    const res = await del(`/api/parties/${id}`);
    socket.emit('deleteParty', '모임삭제');
  };

  return (
    <S.List>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={alarm}
        onClose={closeAlarm}
        message="모임이 활성화 됐습니다. 채팅창을 확인하세요!"
        autoHideDuration={6000}>
        <Alert onClose={closeAlarm} severity="success" sx={{ width: '100%' }}>
          모임이 활성화 됐습니다. 채팅창을 확인하세요!
        </Alert>
      </Snackbar>
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
            <Fragment>모집 현황 {`${likedNum?.likedNum}/${party.partyLimit}`}</Fragment>
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
        <S.DeleteButton onClick={() => clickLeaveButton(party.partyId)}>참여 취소</S.DeleteButton>
      )}
      {likedNum && isFullParty(likedNum.likedNum, party.partyLimit) && (
        <S.Complete>모집 완료</S.Complete>
      )}
    </S.List>
  );
};
export default MyPartyItem;
