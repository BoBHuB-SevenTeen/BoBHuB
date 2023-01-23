import styled from 'styled-components';
import { TextField } from '@mui/material';

export const CommentContainer = styled.form`
  display: flex;
  width: 47vw;
  justify-content: space-between;
  position: relative;
`;

export const RatingContainer = styled.div`
  display: flex;
  position: absolute;
  top: -35px;
  left: 10px;
`;

export const CommentField = styled(TextField)`
  width: 40vw;
`;
