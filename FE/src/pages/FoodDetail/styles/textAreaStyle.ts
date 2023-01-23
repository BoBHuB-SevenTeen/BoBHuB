import styled from 'styled-components';

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Button = styled.button`
  background-color: crimson;
  width: 60px;
  font-size: 10px;
  cursor: pointer;
  color: white;

  &:hover {
    background-color: black;
  }
`;

export const CommentArea = styled.textarea`
  margin-top: 10px;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.container};
  border-radius: 10px;
  color: darygray;
  border: none;
  border-bottom: 1px solid white;
  box-sizing: border-box;
  font-size: 13px;
  height: 55px;
  resize: none;

  &:focus {
    outline: none;
  }

  &:disabled {
    font-weight: bold;
    color: ${({ theme }) => theme.font.color.black};
    border: none;
  }
`;
