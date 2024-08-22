import React, { useRef } from "react";
import * as S from './style'
import { CiInboxOut } from "react-icons/ci";
import TabelaDashboard from "../../components/TabelaDashboard";
import { useEffect, useState } from "react";
import axios from "axios";
import axios_api from '../../api/axios'
import { MdOutlineAttachMoney, MdOutlineShoppingCart } from "react-icons/md";
import DashboardValores from "../../components/DashboardValores";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  Tooltip,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Cell
} from 'recharts';
import { useReactToPrint } from 'react-to-print';
import Relatorio from "../../components/Relatorio";
import Sleep from '../../components/Error/SleepSytem';

interface User {
  id: 1,
  first_name: string,
}

interface Orders {
  id: number;
  customer: Custom[];
  created_at: string;
  payment: string;
  products: Product;
  total: string;
  discount: number;
  total_price: string;
  user: User;
}

interface Custom {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  value: number;
}

interface MonthlyData {
  month: string;
  count: number;
}

export default function Report() {

  const headers = ['#', 'Resumo', 'Cliente', 'Data', 'Vendedor'];
  const [user, setUser] = useState<User[]>([]);
  const [totalProduct, setTotalProduct] = useState('');
  const [totalCustom, setTotalCustom] = useState('');
  const [totalVenda, setTotalVenda] = useState('');
  const [venda, setVenda] = useState('');
  const [openSleep, setOpenSleep] = useState(false);
  const [order, setOrder] = useState<Orders[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const currentMonth = new Date().getMonth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          userResponse,
          productResponse,
          vendaResponse,
          customResponse] = await Promise.all([
            axios_api.get(`v1/user`),
            axios_api.get('v1/product'),
            axios_api.get('v1/order'),
            axios_api.get('v1/customer'),
          ]);
        setUser(userResponse.data.data);
        setTotalProduct(productResponse.data.total);
        setOrder(vendaResponse.data.data);
        setTotalCustom(customResponse.data.total);
        setVenda(vendaResponse.data.total);

        // Processar os dados dos agendamentos
        const currentYear = new Date().getFullYear();
        const filteredSchedules = vendaResponse.data.data.filter((venda: { created_at: string | number | Date; }) => {
          const scheduleYear = new Date(venda.created_at).getFullYear(); //ano atual
          return scheduleYear === currentYear;
        });
        
        const monthlyCount = Array(12).fill(0);
        filteredSchedules.forEach((venda: { created_at: string | number | Date; }) => {
          const month = new Date(venda.created_at).getMonth();
          monthlyCount[month]++;
        });
        console.log(monthlyCount);
        
        const data = monthlyCount.map((count, index) => ({
          month: new Date(2024, index).toLocaleString('default', { month: 'short' }),
          count: count,
          index
        }));
        setMonthlyData(data);

        // Mapeia para pegar o total_price de cada venda
        const totalPrices = vendaResponse.data.data.map((order: { total_price: string; }) => parseFloat(order.total_price));

        // Se você quiser somar todos os valores
        const totalSum = totalPrices.reduce((acc: any, curr: any) => acc + curr, 0).toString();

        setTotalVenda(totalSum);

      } catch (e) {
        console.log(e);
        if (axios.isAxiosError(e)) {
          const status = e.response?.status;
          if (status === 401) {
            setOpenSleep(true);
          }
        }
      }
    };
    fetchData();
  }, []);

  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
  });

  if (openSleep) {
    return <Sleep />
  }

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
          title="Produtos"
          icon={<MdOutlineShoppingCart />}
          valor={totalProduct}
        />
        <DashboardValores
          title="Cliente"
          icon={<MdOutlineAttachMoney />}
          valor={totalCustom}
        />
        <DashboardValores
          title="Vendas"
          icon={<MdOutlineAttachMoney />}
          valor={venda}
        />
        <DashboardValores
          title="Total"
          icon={<MdOutlineAttachMoney />}
          valor={totalVenda}
        />
      </S.ContainerVal>

      <S.ContainerTop>
        <S.DivLeft>
          <S.TitleBlack>
            Visão Geral das Vendas
          </S.TitleBlack>

          <ResponsiveContainer width="100%" height="85%">
            <BarChart width={150} height={40} data={monthlyData}>
              <Bar
                dataKey="count"
                radius={6}> 
                {monthlyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === currentMonth ? '#DF3B82' : '#ec66a0'} />
                ))}
              </Bar>

              <XAxis
                dataKey="month" />

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
              data={monthlyData}>
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="month" stroke="#DF3B82" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="count" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </S.DivRight>

      </S.ContainerTop>

      <S.ContainerBottom>
        <TabelaDashboard
          linhaHead={headers}
          dados={order} />
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
