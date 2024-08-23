import styled from 'styled-components';

export const Container = styled.div`
  display: grid;

  grid-template-columns: 220px auto;
  grid-template-areas: 'AS CT' 'AS CT';

  height: 100vh;

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
  }
`;

export const Sidebar = styled.aside<{ isOpen: boolean }>`
  grid-area: AS;
  width: 220px;
  background-color: #333;
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
    width: 100%;
  }
`;

export const Content = styled.main`
  grid-area: CT;
  padding: 20px;
  flex: 1;

  @media (max-width: 900px) {
    margin-left: 0;
    padding: 15px;
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
  background-color: ${(props) => props.theme.colors.primary};
  padding: 10px 8px;
  border-radius: 10%;
  color: white;

  svg{
    font-size: 24px;
  }

  @media (max-width: 900px) {
    display: flex;
  }
`;