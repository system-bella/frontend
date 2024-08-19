import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios_product from "../../../api/axios"
import ModalDel from '../../../components/ModalDelete';
import EditCategoria from "../Update";
// icons
import { CiTrash, CiEdit } from 'react-icons/ci';

interface Categoria {
    id: number,
    category: string,
}

export default function ListagemCategoria() {

    const [categoria, setCategoria] = useState<Categoria[]>([]);
    const [openModalDel, setOpenModalDel] = useState(false);
    const [categoriaId, setCategoriaId] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [openModalEdite, setOpenModalEdite] = useState(false);

    const handleOpenModal = (productId: number, nome: string) => {
        if (nome === 'delete') {
            setCategoriaId(productId);
            setOpenModalDel(true);
        }
        if (nome === 'edit') {
            setCategoriaId(productId);
            setOpenModalEdite(true);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(event.target.value);
        if (value === '') {
            setSearchTerm('')
        }
    };

    const handleModalClose = (updatedCategory: Categoria | null) => {
        setOpenModalEdite(false);
        if (updatedCategory) {
            setCategoria(
                prevCategoria =>
                    // O map é usado para iterar sobre a lista de categorias existentes.
                    prevCategoria.map(
                        categoria =>
                            // verifica se o id coincide com o id da categoria atualizada
                            categoria.id === updatedCategory.id ? updatedCategory : categoria
                    )
            );
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                let url = 'v1/category';
                if (searchTerm.trim() !== "") {
                    url = `v1/category?search=${searchTerm}`;
                }
                const response = await axios_product.get(url);
                setCategoria(response.data);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, [searchTerm]);

    return (
        <Container>
            <Content>
                <Input
                    autoComplete="off"
                    id="categoria"
                    type="text"
                    placeholder="Informe a categoria"
                    onChange={handleInputChange}
                />

                <ul>
                    {
                        categoria.map((val) => {
                            return (
                                <li key={val.id}>
                                    <button>
                                        {val.category}
                                    </button>
                                    <span>
                                        <button onClick={() => handleOpenModal(val.id, 'edit')}>
                                            <CiEdit />
                                        </button>
                                        <button onClick={() => handleOpenModal(val.id, 'delete')}>
                                            <CiTrash />
                                        </button>
                                    </span>
                                </li>
                            )
                        })
                    }
                </ul>
            </Content>
            <ModalDel
                url='category'
                isOpen={openModalDel}
                setModalOpen={() => {
                    setOpenModalDel(false);
                }}
                itemId={categoriaId}
            />

            <EditCategoria
                onClose={handleModalClose}
                isOpen={openModalEdite}
                setModalOpen={() => {
                    setOpenModalEdite(false);
                }}
                itemId={categoriaId}
            />
        </Container>
    );
}


export const Container = styled.div`
    width: 100%;
    `

export const Content = styled.div`
    width: 100%;
    border: 1px solid ${(props) => props.theme.colors.secondary.gray_100};
    border-radius: 16px;
    font-size: 15px;
    padding: 8px;
    background-color: ${(props) => props.theme.colors.white};
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 10px;

    ul{
        width: 100%;
    }

    span{
        display: flex;
        gap: 10px;
    }

    li{
        list-style: none;
        display: flex;
        justify-content: space-between;
        padding: 3px;
    }

    svg{
        color: ${(props) => props.theme.colors.warning};
        font-size: 18px;
    }

    svg:hover{
        color: red;
    }

    button{
        background-color: transparent;
    }

    button:hover{
        color: ${(props) => props.theme.colors.primary};
    }
`
//input
export const Input = styled.input`
  border: 1px solid ${(props) => props.theme.colors.secondary.gray_100};
  border-radius: 6px;
  padding: 10px 16px;
  &::placeholder {
    font-size: 16px;
  }
  width: 100%;
  height: 44px;
`;