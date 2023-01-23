import styled from 'styled-components';
import { FlexContainer } from '../../../styles/GlobalStyle';
import { Button } from '@mui/material';

export const ListContainer = styled(FlexContainer)`
  height: 150px;
  box-shadow: 2px 2px 2px gray;
  width: 50vw;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.sub};
  position: relative;
  margin: 15px;
`;

export const ContentContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 3;
  color: ${({ theme }) => theme.font.color.black};
  padding: 10px;

  & > article {
    margin: 10px 0;
  }

  .buttonWrap {
    display: flex;
    width: 175px;
    justify-content: space-between;
    position: absolute;
    right: 20px;
    top: 15px;
  }
`;

export const AvatarContainer = styled(FlexContainer)`
  flex: 1;
  justify-content: center;
`;

export const CustomButton = styled(Button)`
  width: 80px;
`;
