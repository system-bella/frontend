import React from "react";
import * as S from './style'
import {
    CiTrash,
    CiEdit
} from 'react-icons/ci';

interface TabelaProps {
    linhaHead: string[];
    dados: Array<{ [key: string]: any }>;
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
                                {index+1}
                            </td>
                            <td>
                                {val.total_price}
                            </td>
                            <td>
                                {val.customer?.name || '-'}
                            </td>
                            <td>
                                {val.created_at}
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