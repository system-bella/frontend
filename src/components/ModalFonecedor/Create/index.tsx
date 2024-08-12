import React, { useState } from "react";
import styled from "styled-components";
import IlayoutModal from "../../IlayoutModal";
interface IModalCreateProps {
    isOpen: boolean;
    setModalOpen: any;
}

export default function CreateFornecedor(
    { isOpen,
        setModalOpen
    }: IModalCreateProps) {

    const [loading, setLoading] = useState(false);

    if (isOpen) {
        return (
            <Container>
                <IlayoutModal
                    titleName="Fornecedor"
                    titleRestName="Cadastrar"
                    setModalClose={setModalOpen}
                    loading={loading}>
                    <DivInput>
                        <label>Nome do Forncedor *</label>
                        <Input
                            type="text"
                            placeholder="Informe o nome do fornecedor"
                        />
                    </DivInput>
                </IlayoutModal>
            </Container>
        )

    }
    return null;
}


export const Container = styled.div`
`

// conten label+input
export const DivInput = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;

  small {
    color: ${(props) => props.theme.colors.warning};
  }
`;

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