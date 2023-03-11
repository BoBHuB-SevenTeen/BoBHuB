import styled from 'styled-components';
import { FlexContainer } from '../../../styles/GlobalStyle';
import { Card, Button } from '@mui/material';

export const ContentContainer = styled(FlexContainer)`
  flex-direction: column;
  width: 60vw;
  justify-content: flex-start;
  margin-bottom: 70px;
`;

export const MenuContainer = styled(FlexContainer)`
  width: inherit;
  margin-top: 40px;
  align-items: flex-start;
  justify-content: space-between;
  .description {
    font-size: 1.5rem;
  }
`;

export const TitleContainer = styled(FlexContainer)`
  width: inherit;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 0.5px solid black;
  height: 15%;
`;

export const Title = styled.div`
  font-size: 2.5rem;
  margin-left: 50px;
`;

type MenuCardProps = {
  width: string;
  size: string;
  padding?: string;
  margin?: string;
  fontSize?: string;
  flex?: string;
};

export const MenuCard = styled(Card)<MenuCardProps>`
  width: ${(props) => props.width};
  font-size: ${(props) => props.size};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  font-size: ${({ theme }) => theme.fontSize.subTitle};
  flex: ${(props) => props.flex};
  p {
    margin-bottom: 20px;
  }
`;

export const ATag = styled.a`
  text-decoration: none;
  color: #1e1f21;
  font-size: 1.2rem;
  position: relative;
  &:hover {
    color: ${({ theme }) => theme.colors.main};
  }
  &:before {
    content: ' ';
    position: absolute;
    background-color: black;
    height: 1px;
    width: 0;
    transition: 0.5s;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
  }
  &:hover:before {
    width: 100%;
  }
`;

export const SelectContainer = styled.div`
  height: inherit;
`;

export const LikeButton = styled(Button)`
  width: 110px;
`;
