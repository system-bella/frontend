import React, { useRef } from "react";
import * as S from './style'
import { CiInboxOut } from "react-icons/ci";
import TabelaDashboard from "../../components/TabelaDashboard";
import { useEffect, useState } from "react";
import axios from "axios";
import axios_api from '../../api/axios'
import {
  MdOutlineAttachMoney,
  MdOutlineShoppingCart,
  MdPersonOutline,
  MdOutlineShoppingBasket
} from "react-icons/md";
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
import Loading from '../../components/Loading';
import ModalSection from "../../components/ModalSection";
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
  month: string; // Nome do mês, ex: "Jan", "Feb", etc.
  total: string; // Total de vendas no mês em formato de string, ex: "1234.56"
  index: number; // Índice do mês (0 = Janeiro, 11 = Dezembro)
}

const formattedTotalVenda = (totalVenda: any) => new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
}).format(parseFloat(totalVenda));

export default function Report() {

  const headers = ['#', 'Resumo', 'Cliente', 'Data', 'Vendedor'];
  const [totalProduct, setTotalProduct] = useState('');
  const [totalCustom, setTotalCustom] = useState('');
  const [totalVenda, setTotalVenda] = useState('');
  const [venda, setVenda] = useState('');
  const [order, setOrder] = useState<Orders[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const currentMonth = new Date().getMonth();
  const [openSleep, setOpenSleep] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchData = async () => {
      setLoadingModal(true);
      try {
        const [
          productResponse,
          vendaResponse,
          customResponse] = await Promise.all([
            axios_api.get('v1/product'),
            axios_api.get('v1/order'),
            axios_api.get('v1/customer'),
          ]);
        setTotalProduct(productResponse.data.total);
        setTotalCustom(customResponse.data.total);
        setVenda(vendaResponse.data.total);
        if (vendaResponse.data.data.length > 0) {
          setOrder(vendaResponse.data.data);

          // Processar os dados dos agendamentos (vendas)
          const filteredSales = vendaResponse.data.data.filter((venda: { created_at: string | number | Date; }) => {
            const saleYear = new Date(venda.created_at).getFullYear(); // Ano atual
            return saleYear === currentYear;
          });

          const monthlySales = Array(12).fill(0); // Inicializa um array com 12 posições, uma para cada mês
          filteredSales.forEach((venda: { created_at: string | number | Date; total_price: string; }) => {
            const month = new Date(venda.created_at).getMonth(); // Pega o mês da venda (0 = Janeiro, 11 = Dezembro)
            monthlySales[month] += parseFloat(venda.total_price); // Soma o total_price ao mês correspondente
          });

          const data = monthlySales.map((total, index) => ({
            month: new Date(2024, index).toLocaleString('default', { month: 'short' }),
            total: total.toFixed(2), // Formata o total para duas casas decimais
            index
          }));
          setMonthlyData(data);

          // Mapeia para pegar o total_price de cada venda
          const totalPrices = vendaResponse.data.data.map((order: { total_price: string; }) => parseFloat(order.total_price));

          // Se você quiser somar todos os valores
          const totalSum = totalPrices.reduce((acc: any, curr: any) => acc + curr, 0).toString();

          // Total de vendas para o mês atual
          const totalMesAtual = monthlySales[currentMonth];
          setTotalVenda(totalMesAtual);
        }


      } catch (e) {
        console.log(e);
        if (axios.isAxiosError(e)) {
          const status = e.response?.status;
          if (status === 401) {
            setOpenSleep(true);
          }
        }
      } finally {
        setLoadingModal(false);
      }
    };
    fetchData();
  }, []);

  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
  });

  if (openSleep) {
    return <ModalSection />
  }

  return (
    <S.Container>
      {loadingModal && (<Loading />)}
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
          icon={<MdPersonOutline />}
          valor={totalCustom}
        />
        <DashboardValores
          title="Vendas"
          icon={<MdOutlineShoppingBasket />}
          valor={venda}
        />
        <DashboardValores
          title="Total Mensal"
          icon={<MdOutlineAttachMoney />}
          valor={formattedTotalVenda(totalVenda)}
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
                dataKey="total"
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
              <Line type="monotone" dataKey="total" stroke="#82ca9d" />
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
          <Relatorio
            produto={totalProduct}
            cliente={totalCustom}
            venda={venda}
            total={totalVenda} 
            dados={order}/>
        </div>
      </div>
    </S.Container>
  )
}
