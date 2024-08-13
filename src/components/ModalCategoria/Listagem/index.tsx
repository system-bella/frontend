import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios_product from "../../../api/axios"
import ModalDel from '../../../components/ModalDelete';
// icons
import { CiTrash } from 'react-icons/ci';

interface Categoria {
    id: number,
    category: string,
}

interface ModalCat {
    // onSelectCategory: (category: string) => void
    onSelectCategory: any
    searchTerm: string
}

export default function ListagemCategoria(
    {
        onSelectCategory, 
        searchTerm
    }: ModalCat) {

    const [categoria, setCategoria] = useState<Categoria[] | null>(null);
    const [openModalDel, setOpenModalDel] = useState(false);
    const [categoriaId, setCategoriaId] = useState<number | null>(null);

    const handleOpenModal = (productId: number) => {
        setCategoriaId(productId);
        setOpenModalDel(true);
    };
console.log(searchTerm);
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

                <ul>
                    {
                        categoria?.map((val) => {
                            return (
                                <li key={val.id}>
                                    <button onClick={() => onSelectCategory(val.category, val.id)}>
                                        {val.category}
                                    </button>
                                    <button onClick={() => handleOpenModal(val.id)}>
                                        <CiTrash />
                                    </button>
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

    li{
        list-style: none;
        display: flex;
        justify-content: space-between;
        padding: 3px;
    }

    svg{
        color: ${(props) => props.theme.colors.warning};
        font-size: 16px;
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