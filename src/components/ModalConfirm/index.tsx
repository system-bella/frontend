import React from "react";
import styled from "styled-components";
import { CiCircleRemove } from "react-icons/ci";

interface Props {
    title: string;
    restTitle: string;
    icon: any;
    isOpen: boolean;
    setModalOpen: any;
}
export default function ModalConfirm({
    title,
    restTitle,
    isOpen,
    setModalOpen,
    icon
}: Props) {

    const handleCloseModal = () => {
        setModalOpen();
    };

    if (isOpen) {
        return (
            <Container>
                <Content>
                    <DivInfor>
                        {icon}
                        <Infor>
                            <h4>{title}</h4>
                            <p>{restTitle}</p>
                        </Infor>
                    </DivInfor>
                    <Button onClick={handleCloseModal}>
                        {<CiCircleRemove />}
                    </Button>
                </Content>
            </Container>
        )
    }
    return null;
}

export const Container = styled.div`
  position: fixed;
  right: 0;
  left: 1;
  top: 0;
  bottom: 0;
  z-index: 1000;
`

export const Content = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    margin: 20px;
    padding: 5px;
    width: 350px;
    min-height: 80px;

    /* border-left: 6px solid #FF3B30;
    color: #FF3B30;
    background: #ff3a3032; */
    
    color: #3643fa;
    border-left: 6px solid #3b82f6;
    background: #478dfc36;

    box-shadow: 0 8px 32px 0 rgba( 0, 0, 0, 0.2 );
    backdrop-filter: blur( 18.5px );
    -webkit-backdrop-filter: blur( 18.5px );
    border-radius: 10px;
    
    svg{
        font-size: 20px;
    }
`

export const DivInfor = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    svg{
        font-size: 34px;
    }
`

export const Infor = styled.div`
    p{
        font-size: 14px;
    }
`
export const Button = styled.button`
    /* color: #FF3B30; */
    color: #3b82f6;
    background-color: transparent;
    display: flex;
`