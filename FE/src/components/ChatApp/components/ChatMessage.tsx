import { MessageInfo } from '../../ChatApp/ChatAppApi';
import * as S from '../styles/chatMessageStyle';
import useUser from './../../../queries/useUserQuery';

interface ChatMessageProps {
  messageInfo: MessageInfo;
}

const ChatMessage = ({ messageInfo: { userId, userName, message } }: ChatMessageProps) => {
  const { data: user, isSuccess } = useUser();

  return (
    <>
      {isSuccess &&
        (userId !== user.userId ? (
          <S.OtherMessage>
            <S.TextWrapper>
              {userId !== 0 && userId !== user.userId && (
                <span className="labelName">{userName}</span>
              )}
              {<S.TextBox>{message}</S.TextBox>}
            </S.TextWrapper>
          </S.OtherMessage>
        ) : (
          <S.MyMessage>
            <S.TextWrapper>
              {userId !== 0 && userId !== user.userId && (
                <span className="labelName">{userName}</span>
              )}
              {<S.TextBox>{message}</S.TextBox>}
            </S.TextWrapper>
          </S.MyMessage>
        ))}
    </>
  );
};

export default ChatMessage;
