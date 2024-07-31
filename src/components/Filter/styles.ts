import styled from 'styled-components';

export const Filter = styled.select`
  margin-left: 15px;
  border: 1px solid ${(props) => props.theme.colors.black};
  border-radius: 10px;
  padding: 10px 16px;

  background-color: ${(props) => props.theme.colors.white};
`;
