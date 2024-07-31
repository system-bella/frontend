import { useState, useEffect } from 'react';
import * as S from './styles';
import {
  CiGrid42,
  // CiUser,
  // CiShoppingCart,
  CiCircleInfo,
  CiLogout
} from 'react-icons/ci';
//import { IoAnalytics } from 'react-icons/io5';

export default function Aside() {
  const [clicked, setClicked] = useState(() => {
    const currentURL = window.location.pathname.slice(1);
    return currentURL || 'Orders';
  });

  useEffect(() => {}, [clicked]);

  const tootleMenu = (value: string) => {
    setClicked(value);
  };

  return (
    <S.Container>
      <a href="/Orders">
        <img src={require('../../assets/logo.png')} alt="logo" />
      </a>

      <span>Principal</span>

      <S.Menu>
        {/* <S.MenuLink
          href="/Orders"
          onClick={() => tootleMenu('Orders')}
          style={
            clicked === 'Orders'
              ? { background: 'rgb(255, 255, 255, 0.3)' }
              : { background: 'none' }
          }
        >
          <CiShoppingCart />
          <small>Vendas</small>
        </S.MenuLink> */}

        {/* <S.MenuLink
          href="/Customer"
          onClick={() => tootleMenu('Customer')}
          style={
            clicked === 'Customer'
              ? { background: 'rgb(255, 255, 255, 0.3)' }
              : { background: 'none' }
          }
        >
          <CiUser />
          <small>Clientes</small>
        </S.MenuLink> */}

        <S.MenuLink
          href="/Product"
          onClick={() => tootleMenu('Product')}
          style={
            clicked === 'Product' || clicked === 'Product/Create'
              ? { background: 'rgb(255, 255, 255, 0.3)' }
              : { background: 'none' }
          }
        >
          <CiGrid42 />
          <small>Produtos</small>
        </S.MenuLink>

        {/* <S.MenuLink
          href="/Report"
          onClick={() => tootleMenu('Report')}
          style={
            clicked === 'Report'
              ? { background: 'rgb(255, 255, 255, 0.3)' }
              : { background: 'none' }
          }
        >
          <IoAnalytics />
          <small>Relatórios</small>
        </S.MenuLink> */}
      </S.Menu>

      <span>Outros</span>

      <S.Menu>
        <S.MenuLink
          href="https://truth-macaroon-fe8.notion.site/Manual-de-Usu-rio-do-Sistema-L-Bella-40dac94394de4aa7ad7e437d81cb8055?pvs=4"
          target="_blank"
        >
          <CiCircleInfo />
          <small>Manual</small>
        </S.MenuLink>
        <S.MenuLink href="/">
          <CiLogout />
          <small>Sair</small>
        </S.MenuLink>
      </S.Menu>
    </S.Container>
  );
}
