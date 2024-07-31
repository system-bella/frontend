import styled from 'styled-components';

export const Container = styled.a`
  text-decoration: none;
  font-size: 16px;
  color: ${(props) => props.theme.colors.white};

  background-color: ${(props) => props.theme.colors.primary};

  padding: 10px;
  border-radius: 10px;
`;
