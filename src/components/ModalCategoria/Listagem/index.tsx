import React from "react";
import styled from "styled-components";

// icons
import { CiTrash } from 'react-icons/ci';

interface Modal {
    isOpen: boolean;
    setModalOpen: any;
}

export default function ListagemCategoria() {

    return (
        <Container>
            <Content>

                <ul>
                    <li>
                        <button>
                            Categoria 1
                        </button>
                        <button>
                            <CiTrash />
                        </button>
                    </li>
                    <li>
                        <button>
                            Categoria 2
                        </button>

                        <button>
                            <CiTrash />
                        </button>
                    </li>
                    <li>
                        <button>
                            Categoria 3
                        </button>
                        <button>
                            <CiTrash />
                        </button>
                    </li>
                </ul>
            </Content>
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