import React, { useState } from "react";
import * as S from './style'
import {
    CiTrash,
    CiEdit
} from 'react-icons/ci';
import ModalDell from '../ModalDelete';
import UpdateUser from '../ModalUser/Update';

interface TabelaProps {
    linhaHead: string[];
    dados: Array<{ [key: string]: any }>;
}

export default function Tabela({
    linhaHead,
    dados,
}: TabelaProps) {
    const [openModalDell, setOpenModalDell] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
    const [openModalEdite, setOpenModalEdite] = useState(false);
    
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
                                {val.id}
                            </td>
                            <td>
                                {val.first_name + " " + val.last_name}
                            </td>
                            <td>
                                {val.email}
                            </td>
                            <td >
                                {val.is_admin === 1 ? 'admin' : 'atendente'}
                            </td>
                            <td>
                                <span>
                                    <button
                                        onClick={() => {
                                            setSelectedItemId(val.id);
                                            setOpenModalEdite(true);
                                        }}>
                                        <CiEdit />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedItemId(val.id);
                                            setOpenModalDell(true);
                                        }}>
                                        <CiTrash />
                                    </button>
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </S.BodyTable>
            <UpdateUser
                isOpen={openModalEdite}
                setModalOpen={() => {
                    setOpenModalEdite(false);
                }}
                itemId={selectedItemId} 
                />
            <ModalDell
                url='user'
                isOpen={openModalDell}
                itemId={selectedItemId}
                setModalOpen={() => {
                    setOpenModalDell(false);
                }} />
        </S.Container>
    )
}