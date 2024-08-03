import styled from 'styled-components';

export const Container = styled.div`
  grid-area: AS;
  background-color: ${(props) => props.theme.colors.primary};

  display: flex;
  justify-content: space-between;
  flex-direction: column;

  img {
    padding: 30px 16px;
    height: 120px;
  }

  span {
    font-size: 16px;
    font-weight: 200;
    color: ${(props) => props.theme.colors.white};

    margin: 10px 0;
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
    background-color: rgb(255, 255, 255, 0.3);
  }
`;

export const Footer = styled.footer`
  display: flex;
  align-items: center;

  height: 40px;
  margin-bottom: 15px;
  color: ${(props) => props.theme.colors.white};
  
  
  img{
    border-radius: 50%;
    object-fit: cover;
    height: 100px;
  }
  `

export const Imagem = styled.div`
`
