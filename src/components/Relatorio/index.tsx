import React from "react";
import * as S from './style'
import DashboardValores from "../DashboardValores";
import {
    MdOutlineAttachMoney,
    MdOutlineShoppingCart,
    MdPersonOutline,
    MdOutlineShoppingBasket
} from "react-icons/md";

interface Props {
    produto: string,
    cliente: string,
    venda: string,
    total: string

}

const formattedTotalVenda = (totalVenda: any) => new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
}).format(parseFloat(totalVenda));

export default function Relatorio({
    produto,
    venda,
    cliente,
    total
}: Props) {

    const timestamp = Date.now();
    // Cria um objeto Date usando o timestamp
    const currentDate = new Date(timestamp);
    // Converte para um formato legível (data e hora)
    const formattedDate = currentDate.toLocaleString(); // Exibe data e hora
    console.log(formattedDate);

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
                    {formattedDate}
                </p>
            </S.Data>
            <S.Content>

                <h2>Relatório de Venda</h2>
                <S.DivValores>
                    <DashboardValores
                        title="Produtos"
                        icon={<MdOutlineShoppingCart />}
                        valor={produto}
                    />
                    <DashboardValores
                        title="Cliente"
                        icon={<MdPersonOutline />}
                        valor={cliente}
                    />
                    <DashboardValores
                        title="Vendas"
                        icon={<MdOutlineShoppingBasket />}
                        valor={venda}
                    />
                    <DashboardValores
                        title="Total Mensal"
                        icon={<MdOutlineAttachMoney />}
                        valor={formattedTotalVenda(total)}
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