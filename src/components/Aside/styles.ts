import styled from 'styled-components';

export const Container = styled.div`
  grid-area: AS;
  background-color: ${(props) => props.theme.colors.primary};
  
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  
  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
  }
  
  img {
    margin: 30px 16px;
    height: 60px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 10px;
  }

  span {
    font-size: 16px;
    font-weight: 200;
    color: ${(props) => props.theme.colors.white};

    margin: 10px 0;
    padding: 0 16px;
  }
`;

export const Title = styled.p`
  font-size: 16px;
  font-weight: 200;
  color: ${(props) => props.theme.colors.white};

  margin: 10px 0;
  padding: 0 16px;
`

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

  &.active {
    background-color: rgb(255, 255, 255, 0.3)
  }

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
  padding: 10px 16px;

  height: 40px;
  margin-bottom: 25px;
  color: ${(props) => props.theme.colors.white};
  `

export const Imagem = styled.div`
  color: ${(props) => props.theme.colors.white};
  border-radius: 50%;
  height: 35px;
  margin-right: 30px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 10px;
  
  p{
    font-weight: 500;
    padding: 6px;
  }
`

export const ButtonExit = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;

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
`
export const Sidebar = styled.aside<{ isOpen: boolean }>`
  grid-area: AS;
  background-color: ${(props) => props.theme.colors.primary};
  width: 220px;
  color: #fff;
  height: 100vh;
  position: fixed;
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.3s ease-in-out;
  
  @media (max-width: 900px) {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 10;
  }
`;

export const HamburgerButton = styled.button`
  display: none;
  position: absolute;
  top: 15px;
  left: 15px;
  z-index: 11;
  background: none;
  border: none;
  cursor: pointer;

  @media (max-width: 900px) {
    display: block;
  }

  &:focus {
    outline: none;
  }
`;
