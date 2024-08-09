import { useState, useEffect } from 'react';
import * as S from './styles';
import {
  CiGrid42,
  CiUser,
  CiShoppingCart,
  CiSun,
  CiCircleInfo,
  CiLogout
} from 'react-icons/ci';
import Logout from '../Logout';
import { IoAnalytics } from "react-icons/io5";

export default function Aside() {
  const [clicked, setClicked] = useState(() => {
    const currentURL = window.location.pathname.slice(1);
    return currentURL || 'Orders';
  });
  const [openModalLogout, setOpenModalLogout] = useState(false);

  useEffect(() => { }, [clicked]);

  const tootleMenu = (value: string) => {
    setClicked(value);
  };

  return (
    <S.Container>
      <div>

        <a href="/Orders">
          <img src={require('../../assets/logo.png')} alt="logo" />
        </a>

        <S.Title>Principal</S.Title>

        <S.MenuLink
            href="/Report"
            onClick={() => tootleMenu('Report')}
            className={clicked === 'Report' ? 'active' : ''}
          >
            <IoAnalytics />
            <small>Relatórios</small>
          </S.MenuLink>

        <S.Menu>
          <S.MenuLink
            href="/Orders"
            onClick={() => tootleMenu('Orders')}
            className={clicked === 'Orders' || clicked === 'Orders/Create' ? 'active' : ''}
          >
            <CiShoppingCart />
            <small>Vendas</small>
          </S.MenuLink>

          <S.MenuLink
            href="/Product"
            onClick={() => tootleMenu('Product')}
            className={clicked === 'Product' || clicked === 'Product/Create' ? 'active' : ''}
          >
            <CiGrid42 />
            <small>Produtos</small>
          </S.MenuLink>

          <S.MenuLink
            href="/Client"
            onClick={() => tootleMenu('Client')}
            className={clicked === 'Client' || clicked === 'Client/Create' ? 'active' : ''}
          >
            <CiUser />
            <small>Clientes</small>
          </S.MenuLink>
        </S.Menu>

        <S.Title>Outros</S.Title>

        <S.Menu>
          <S.MenuLink
            href="/usuario"
            onClick={() => tootleMenu('usuario')}
            className={clicked === 'usuario' ? 'active' : ''}
          >
            <CiSun />
            <small>Usuário</small>
          </S.MenuLink>

          <S.MenuLink
            href="https://truth-macaroon-fe8.notion.site/Manual-de-Usu-rio-do-Sistema-L-Bella-40dac94394de4aa7ad7e437d81cb8055?pvs=4"
            target="_blank">
            <CiCircleInfo />
            <small>Manual</small>
          </S.MenuLink>

          <S.ButtonExit onClick={() => setOpenModalLogout(true)}>
            <CiLogout />
            <small>Sair</small>
          </S.ButtonExit>

        </S.Menu>
      </div>

      <Logout
        isOpen={openModalLogout}
        setModalOpen={() => setOpenModalLogout(false)} />

      <S.Footer>
        <S.Imagem>
          <p>SK</p>
        </S.Imagem>
        <small>Sayury Kato</small>
      </S.Footer>
    </S.Container>
  );
}
