import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

export const Container = styled.div<{ open: boolean }>`
  color: black;
  font-size: 14px;
  width: 400px;
  background-color: white;
  position: absolute;
  top: 100%;
  right: 100px;
  border-radius: 10px;
  z-index: 999;
  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
    rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
  max-height: ${({ open }) => (open ? '500px' : 0)};
  opacity: ${({ open }) => (open ? 1 : 0)};
  transition: all 0.3s ease-in-out;
  overflow: hidden;
`;

export const Div = styled.div`
  padding: 5px 0 5px 0;
  width: 100%;
  border-bottom: 1px solid lightgray;
`;

export const Flex = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: 5px 10px 5px 10px;
  align-items: center;
`;

export const NoPadFlex = styled(Flex)`
  padding: 0;
`;

export const Bar = styled(Flex)`
  justify-content: space-between;
`;

export const CloseButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: transparent;
`;

export const Close = styled(CloseIcon)`
  color: lightgray;
  &:hover {
    color: black;
  }
`;

export const DeleteButton = styled(Button)`
  position: relative;
  right: 0;
`;

export const ListWrapper = styled(Div)`
  max-height: 400px;
  overflow-y: auto;
`;

export const List = styled(Flex)`
  width: 100%;
  justify-content: space-between;
`;

export const Img = styled.img`
  width: 70px;
  height: 70px;
`;
export const ImgWrapper = styled.div`
  width: 70px;
  height: 70px;
  padding: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;
export const Description = styled.div`
  margin-left: 10px;
`;

export const Paragraph = styled.p`
  + p {
    margin-top: 10px;
  }
`;

export const Name = styled(Paragraph)`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Time = styled(Paragraph)`
  color: red;
  font-size: 10px;
`;

export const H3 = styled.h3`
  font-size: 28px;
  font-weight: bolder;
`;

export const BasicLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

export const Complete = styled.p`
  padding: 6px 8px;
  font-size: 15px;
`;
