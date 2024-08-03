import { useState, useEffect } from 'react';
import * as S from './styles';
import {
  CiGrid42,
  CiUser,
  // CiShoppingCart,
  CiSun,
  CiCircleInfo,
  CiLogout
} from 'react-icons/ci';

export default function Aside() {
  const [clicked, setClicked] = useState(() => {
    const currentURL = window.location.pathname.slice(1);
    return currentURL || 'Orders';
  });

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

          <S.MenuLink
            href="/produto"
            onClick={() => tootleMenu('produto')}
            style={
              clicked === 'produto' || clicked === 'produto/Create'
                ? { background: 'rgb(255, 255, 255, 0.3)' }
                : { background: 'none' }
            }
          >
            <CiGrid42 />
            <small>Produtos</small>
          </S.MenuLink>

          <S.MenuLink
            href="/cliente"
            onClick={() => tootleMenu('cliente')}
            style={
              clicked === 'cliente'
                ? { background: 'rgb(255, 255, 255, 0.3)' }
                : { background: 'none' }
            }
          >
            <CiUser />
            <small>Clientes</small>
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
            href="/usuario"
          >
            <CiSun />
            <small>User</small>
          </S.MenuLink>

          <S.MenuLink
            href="https://truth-macaroon-fe8.notion.site/Manual-de-Usu-rio-do-Sistema-L-Bella-40dac94394de4aa7ad7e437d81cb8055?pvs=4"
            target="_blank">
            <CiCircleInfo />
            <small>Manual</small>
          </S.MenuLink>

          <S.MenuLink href="/">
            <CiLogout />
            <small>Sair</small>
          </S.MenuLink>

        </S.Menu>
      </div>
      <S.Footer>
          <img src={require('../../assets/imgLateral.jpg')} alt="foto-perfil" />
        <small>Admin</small>

      </S.Footer>

    </S.Container>
  );
}
