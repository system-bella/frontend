import React from "react";
import * as S from './style'
import { NumericFormat } from 'react-number-format';
import { parseISO, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface TabelaProps {
    linhaHead: string[];
    dados: Array<{ [key: string]: any }>;
}

function formatarData(dataFormat: string) {
    if (dataFormat !== null) {
        const parsedDate = parseISO(dataFormat);
        return format(parsedDate, 'dd/MM/yyyy', { locale: ptBR });
    }
}

export default function TabelaDashboard({
    linhaHead,
    dados
}: TabelaProps) {
    return (
        <S.Container>
            <S.BodyTable>
                <thead>
                    <tr>
                        {linhaHead.map((headItem, index) => (
                            <th key={index}>{headItem}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {dados.map((val, index) => (
                        <tr key={index}>
                            <td>
                                {index + 1}
                            </td>
                            <td>
                                <NumericFormat
                                    displayType={'text'}
                                    thousandSeparator="."
                                    decimalSeparator=","
                                    decimalScale={2}
                                    value={val.total_price}
                                    fixedDecimalScale={true}
                                    prefix='R$'
                                />
                            </td>
                            <td>
                                {val.customer?.name || '-'}
                            </td>
                            <td>
                                {formatarData(val.created_at)}
                            </td>
                            <td>
                                {val.user.first_name}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </S.BodyTable>
        </S.Container>
    )
}