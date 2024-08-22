import React, { useRef } from "react";
import * as S from './style'
import { CiInboxOut } from "react-icons/ci";
import TabelaDashboard from "../../components/TabelaDashboard";
import { useEffect, useState } from "react";
// import axios from "axios";
import axios_api from '../../api/axios'
import { MdOutlineAttachMoney, MdOutlineShoppingCart } from "react-icons/md";
import DashboardValores from "../../components/DashboardValores";
import { LineChart, Line, BarChart, Bar, Tooltip, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { useReactToPrint } from 'react-to-print';
import Relatorio from "../../components/Relatorio";
interface User {
  id: 1,
  first_name: string,
  last_name: string,
  is_admin: number,
  email: string,
}

export default function Report() {

  const headers = ['#', 'Chave', 'Nome', 'E-mail', 'Usuário', 'Ações'];
  const [user, setUser] = useState<User[]>([]);
  const [totalProduct, setTotalProduct] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          userResponse,
          productResponse] = await Promise.all([
            axios_api.get(`v1/user`),
            axios_api.get('v1/product'),
          ]);
          setUser(userResponse.data.data);
          setTotalProduct(productResponse.data.total);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
  });

  const data = [
    { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Fev', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Abr', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Jun', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Jul', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Agos', uv: 3490, pv: 4300, amt: 2100 },
    { name: 'Set', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Out', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Nov', uv: 3490, pv: 4300, amt: 2100 },
    { name: 'Dez', uv: 3090, pv: 4000, amt: 2000, fill: "#DF3B82" },
  ];

  return (
    <S.Container>
      <S.Title>
        <span>
          Relatório{'>'}
          <small>Todos os relatórios</small>
        </span>

        <S.Header>

          <S.NewItem onClick={handlePrint}>
            <CiInboxOut />
            <span>Exportar</span>
          </S.NewItem>
        </S.Header>
      </S.Title>

      <S.ContainerVal>
        <DashboardValores
          title="Produtos Vendidos"
          icon={<MdOutlineShoppingCart />}
          valor={totalProduct}
        />
        <DashboardValores
          title="Total Entrada"
          icon={<MdOutlineAttachMoney />}
          valor="R$ 35.166,50"
        />
        <DashboardValores
          title="Total Saída"
          icon={<MdOutlineAttachMoney />}
          valor="R$ 5.166,50"
        />
        <DashboardValores
          title="Total"
          icon={<MdOutlineAttachMoney />}
          valor="R$ 30.166,50"
        />
      </S.ContainerVal>

      <S.ContainerTop>
        <S.DivLeft>
          <S.TitleBlack>
            Visão Geral das Vendas
          </S.TitleBlack>

          <ResponsiveContainer width="100%" height="85%">
            <BarChart width={150} height={40} data={data}>
              <Bar dataKey="uv" fill="#ec66a0" radius={6} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip itemStyle={{ color: '#b3b1b1' }}
                labelStyle={{ color: '#DF3B82' }}
                cursor={{ fill: 'rgba(255, 0, 234, 0.2)' }} />
            </BarChart>
          </ResponsiveContainer>
        </S.DivLeft>

        <S.DivRight>
          <S.TitleBlack>
            Análise
          </S.TitleBlack>

          <ResponsiveContainer width="100%" height="90%">
            <LineChart
              data={data}>
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pv" stroke="#DF3B82" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </S.DivRight>

      </S.ContainerTop>

      <S.ContainerBottom>
        <TabelaDashboard
          linhaHead={headers}
          dados={user} />
      </S.ContainerBottom>

      <div
        style={{ display: 'none' }}
      >
        <div ref={contentRef}>
          <Relatorio />
        </div>
      </div>
    </S.Container>
  )
}
