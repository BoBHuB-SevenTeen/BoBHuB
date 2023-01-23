import styled from 'styled-components';
import { TextCss } from './chatStyle';

export const ChatContainer = styled.div`
  overflow: auto;
  height: 400px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CursorDiv = styled.div`
  position: relative;
  cursor: pointer;
  font-size: 15px;
  ${TextCss}
`;
