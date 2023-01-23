import styled from 'styled-components';

export const OtherMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: 5px;
`;

export const MyMessage = styled(OtherMessage)`
  justify-content: flex-end;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TextBox = styled.span`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.main};
  color: ${({ theme }) => theme.font.color.black};
  font-size: 15px;
  padding: 8px;
  margin: 5px;
  border-radius: 12px;
  max-width: 172px;
  word-break: break-all;
`;
