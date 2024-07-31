import styled from 'styled-components';

export const NewProduct = styled.a`
  width: 100px;
  padding: 10px 16px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  text-decoration: none;

  color: ${(props) => props.theme.colors.white};

  background-color: ${(props) => props.theme.colors.primary};

  border-radius: 12px;

  span {
    font-size: 16px;
    margin-left: 8px;
  }
`;
