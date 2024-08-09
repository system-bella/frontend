import React from "react";
import * as S from './style'
import DashboardValores from "../DashboardValores";
import { MdOutlineAttachMoney, MdOutlineShoppingCart } from "react-icons/md";
import { LineChart, Line, BarChart, Bar, Tooltip, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts';

export default function Relatorio() {
    const data = [
        {
            name: 'Jan',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Fev',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Mar',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Abr',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Jun',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Jul',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Agos',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        }, {
            name: 'Set',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        }, {
            name: 'Out',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        }, {
            name: 'Nov',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        }, {
            name: 'Dez',
            uv: 3090,
            pv: 4000,
            amt: 2000,
            fill: "#DF3B82",
        },
    ];
    return (
        <S.Container>
            <S.TitleHead>
                <img src={require('../../assets/logo.png')} alt="logo" />
                <S.Infor>
                    <p>Clínica de Olhos Dr. Mateus Levy - 00.000.000/0001-00</p>
                    <p>Av. Armindo Auzier, 1544, Santo Antônio, Itacoatiara-AM</p>
                    <p>@clinicadeolhosdrmateuslevy</p>
                    <p>(92) 9999-9999</p>
                </S.Infor>
            </S.TitleHead>

            <S.Data>
                <p>
                    <strong>
                        Data:
                    </strong>
                    18/12/2024
                </p>
            </S.Data>
            <h2>Relatório de Venda</h2>
            <S.DivValores>
                <DashboardValores
                    title="Total Produto Vendido"
                    icon={<MdOutlineShoppingCart />}
                    valor="1.115"
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
            </S.DivValores>
            <S.Grafico> 
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart width={150} height={40} data={data}>
                        <Bar dataKey="uv" fill="#ec66a0" radius={6} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip itemStyle={{ color: '#b3b1b1' }}
                            labelStyle={{ color: '#DF3B82' }}
                            cursor={{ fill: 'rgba(255, 0, 234, 0.2)' }} />
                    </BarChart>
                </ResponsiveContainer>
            </S.Grafico>

            <S.Tabela>
                <thead>
                    <tr>
                        <th>
                            #
                        </th>
                        <th>
                            Resumo
                        </th>
                        <th>
                            Data
                        </th><th>
                            Produtos
                        </th><th>
                            Quantidade
                        </th><th>
                            Cliente
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>900, 00 R$</td>
                        <td>13/12/2012 08:50</td>
                        <td>Bolsa</td>
                        <td>1</td>
                        <td>Fabiana Luiza</td>
                    </tr><tr>
                        <td>1</td>
                        <td>900, 00 R$</td>
                        <td>13/12/2012 08:50</td>
                        <td>Bolsa</td>
                        <td>1</td>
                        <td>Fabiana Luiza</td>
                    </tr><tr>
                        <td>1</td>
                        <td>900, 00 R$</td>
                        <td>13/12/2012 08:50</td>
                        <td>Bolsa</td>
                        <td>1</td>
                        <td>Fabiana Luiza</td>
                    </tr><tr>
                        <td>1</td>
                        <td>900, 00 R$</td>
                        <td>13/12/2012 08:50</td>
                        <td>Bolsa</td>
                        <td>1</td>
                        <td>Fabiana Luiza</td>
                    </tr><tr>
                        <td>1</td>
                        <td>900, 00 R$</td>
                        <td>13/12/2012 08:50</td>
                        <td>Bolsa</td>
                        <td>1</td>
                        <td>Fabiana Luiza</td>
                    </tr>
                </tbody>
            </S.Tabela>
        </S.Container>
    )
}