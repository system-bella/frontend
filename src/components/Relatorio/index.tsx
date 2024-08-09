import React from "react";
import * as S from './style'
import DashboardValores from "../DashboardValores";
import { MdOutlineAttachMoney, MdOutlineShoppingCart } from "react-icons/md";
import { LineChart, Line, BarChart, Bar, Tooltip, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts';

export default function Relatorio() {

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
            <S.Content>

                <h2>Relatório de Venda</h2>
                <S.DivValores>
                    <DashboardValores
                        title="Produtos Vendidos"
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
            </S.Content>
        </S.Container>
    )
}