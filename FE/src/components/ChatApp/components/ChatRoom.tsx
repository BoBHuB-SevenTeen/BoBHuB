import { Title } from '../styles/chatStyle';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { SocketContext } from '../../../socket/SocketContext';
import ChatMessage from './ChatMessage';
import { setLog } from '../ChatAppApi';
import { MessageInfo } from '../ChatAppApi';
import * as S from '../styles/chatRoomStyle';
import useUser from './../../../queries/useUserQuery';

interface ChatRoomProps {
  roomKey: string;
}

type sendMessageType = React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>;

const ChatRoom = ({ roomKey }: ChatRoomProps) => {
  const [messages, setMessage] = useState<MessageInfo[]>([]);
  const [content, setContent] = useState<string>('');
  const socket = useContext(SocketContext);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data: user, isSuccess } = useUser();
  const [roomName, partyId] = roomKey.split('/');

  const addMessage = (messageInfo: MessageInfo) => {
    setLog(roomKey, messageInfo);
    setMessage((current) => [...current, messageInfo]);
  };

  const enterRoom = () => {
    const message = `방에 입장하셨습니다.`;
    const messageInfo = { userId: 0, userName: '', message };
    setMessage((current) => [...current, messageInfo]);
  };

  const sendMessage = (e: sendMessageType) => {
    e.preventDefault();
    if (content === '') {
      alert('메세지를 입력해주세요');
      return;
    }
    const messageInfo = { userId: user!.userId, userName: user!.name, message: content };
    socket.emit('sendMessage', messageInfo, roomKey, addMessage);
    setContent('');
  };

  useEffect(() => {
    const log = localStorage.getItem(roomKey);
    if (log) {
      const logArr = JSON.parse(log);
      setMessage(logArr);
    }

    enterRoom();

    socket.on('getMessage', (messageInfo) => {
      setLog(roomKey, messageInfo);
      setMessage((current) => [...current, messageInfo]);
    });
  }, []);

  useEffect(() => {
    scrollRef.current!.scrollTop = scrollRef.current!.scrollHeight;
  }, [messages]);

  return (
    <>
      <form onSubmit={sendMessage}>
        <Title>{roomName}</Title>
        <S.Container>
          <S.TextContainer ref={scrollRef}>
            {messages.map((messageInfo: MessageInfo, idx: number) => (
              <ChatMessage messageInfo={messageInfo} key={`${messageInfo.message}${idx}`} />
            ))}
          </S.TextContainer>
          <S.InputContainer>
            <TextField
              hiddenLabel
              id="filled-basic"
              variant="filled"
              size="small"
              sx={{
                width: '200px',
                marginLeft: '10px',
                '& .MuiInputBase-root': {
                  height: 49,
                },
              }}
              value={content}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{ height: '46px', width: '50px' }}
              onClick={sendMessage}>
              전송
            </Button>
          </S.InputContainer>
        </S.Container>
      </form>
    </>
  );
};

export default ChatRoom;
