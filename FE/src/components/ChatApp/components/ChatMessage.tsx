import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { MessageInfo } from '../chatAppApi';
import * as S from '../styles/chatMessageStyle';

interface ChatMessageProps {
  messageInfo: MessageInfo;
}

const ChatMessage = ({ messageInfo: { userId, userName, message } }: ChatMessageProps) => {
  const currentUserId = useSelector<RootState>((state) => state.userReducer.currentUser.userId);

  return (
    <>
      {userId !== currentUserId ? (
        <S.OtherMessage>
          <S.TextWrapper>
            {userId !== 0 && userId !== currentUserId && (
              <span className="labelName">{userName}</span>
            )}
            {<S.TextBox>{message}</S.TextBox>}
          </S.TextWrapper>
        </S.OtherMessage>
      ) : (
        <S.MyMessage>
          <S.TextWrapper>
            {userId !== 0 && userId !== currentUserId && (
              <span className="labelName">{userName}</span>
            )}
            {<S.TextBox>{message}</S.TextBox>}
          </S.TextWrapper>
        </S.MyMessage>
      )}
    </>
  );
};

export default ChatMessage;
