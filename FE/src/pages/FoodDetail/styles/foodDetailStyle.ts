import styled from 'styled-components';
import { FlexContainer } from '../../../styles/GlobalStyle';

export const Pagecontainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
`;

export const CommentContainer = styled(FlexContainer)`
  flex-direction: column;
  margin: 20px;
`;
