import styled from 'styled-components';

export const InputContainer = styled.div`
  display: flex;
  position: absolute;
  align-items: center;
  bottom: 10px;
  left: 10px;
`;

export const TextContainer = styled.div`
  background-color: whitesmoke;
  width: inherit;
  height: 330px;
  padding: 10px 10px 10px 0;

  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .labelName {
    font-size: 10px;
    margin-left: 10px;
  }
`;

export const Container = styled.div`
  background-color: whitesmoke;
  height: 420px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;
