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

export default function Tabela({
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
                                {val.id}
                            </td>
                            <td>
                                {val.first_name + " " + val.last_name}
                            </td>
                            <td>
                                {val.email}
                            </td>
                            <td>
                                {val.is_admin}
                            </td>
                            <td>
                                <span>
                                    <button>
                                        <CiEdit />
                                    </button>
                                    <button>
                                        <CiTrash />
                                    </button>
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </S.BodyTable>
        </S.Container>
    )
}