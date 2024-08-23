import * as S from './styles';
//components
import Aside from '../components/Aside';
import Content from '../components/Content';
import { useState } from 'react';
import { CiMenuBurger } from "react-icons/ci";

export default function Layout({ children }: any) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <S.Container>
      <S.HamburgerButton onClick={toggleSidebar}>
        <CiMenuBurger />
      </S.HamburgerButton>
      
      <Aside isOpen={isSidebarOpen} />
      <Content>{children}</Content>
    </S.Container>
  );
}
