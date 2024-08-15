import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ModalCreate from '../ModalProduct/Create';
import CreateCategoria from '../../components/ModalCategoria/Create';

interface Modal {
    isOpen: boolean;
    setModalOpen: any;
}

export default function ModalOption({
    isOpen,
    setModalOpen
}: Modal) {

    const modalRef = useRef<HTMLDivElement>(null);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalCat, setOpenModalCat] = useState(false);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setModalOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, setModalOpen]);

    if (!isOpen) {
        return null;
    }

    return (
        <Container ref={modalRef}>
            <Content>

                <ul>
                    <li>
                        <button
                            onClick={() => {
                                setOpenModalCreate(true);
                            }}>
                            Produto
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => {
                                setOpenModalCat(true);
                            }}>
                            Categoria</button>
                    </li>
                </ul>
            </Content>

            <ModalCreate
                isOpen={openModalCreate}
                setModalOpen={() => setOpenModalCreate(false)}/>
            <CreateCategoria
                isOpen={openModalCat}
                setModalOpen={() => setOpenModalCat(false)} />
            
        </Container>
    );
}


export const Container = styled.div`
`

export const Content = styled.div`
    border: 1px solid ${(props) => props.theme.colors.secondary.gray_100};
    border-radius: 16px;
    width: 100px;
    font-size: 15px;
    padding: 8px;
    background-color: ${(props) => props.theme.colors.white};
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 10px;
    
    li{
        list-style: none;
    }

    button{
        background-color: transparent;
    }

    button:hover{
        color: ${(props) => props.theme.colors.primary};
    }
`