import styled from 'styled-components';

export const Container = styled.button`
  font-size: 16px;
  color: ${(props) => props.theme.colors.black};
  padding: 10px;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.colors.black};
  border-radius: 10px;

  margin-right: 20px;

  &:hover{
    background-color: black;
    color: white;
  }
`;
