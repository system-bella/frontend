import styled from 'styled-components';

export const Container = styled.div`
  grid-area: AS;
  background-color: ${(props) => props.theme.colors.primary};

  display: flex;
  flex-direction: column;

  img {
    padding: 30px 16px;
    width: 290px;
  }

  span {
    font-size: 16px;
    font-weight: 200;
    color: ${(props) => props.theme.colors.white};

    margin: 25px 0;
    padding: 0 16px;
  }
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MenuLink = styled.a`
  display: flex;
  align-items: center;

  text-decoration: none;
  color: ${(props) => props.theme.colors.white};

  padding: 10px 16px;

  svg {
    font-size: 24px;
    margin-right: 30px;
  }

  small {
    font-size: 16px;
    font-weight: 300;
  }

  transition: 0.3s;

  &:hover {
    //border: 1px solid ${(props) => props.theme.colors.white};
    background-color: rgb(255, 255, 255, 0.3);
  }
`;
