import styled from 'styled-components';

export const Container = styled.div`
  display: flex;

  width: 280px;
  border: 1px solid ${(props) => props.theme.colors.black};
  border-radius: 10px;

  button {
    width: 20%;
    background-color: ${(props) => props.theme.colors.white};
    border-radius: 10px;
  }

  svg {
    font-size: 16px;
    color: ${(props) => props.theme.colors.black};
  }

  input {
    width: 80%;
    padding: 10px;
    border-radius: 10px;

    color: ${(props) => props.theme.colors.black};
    font-size: 16px;
  }
`;
