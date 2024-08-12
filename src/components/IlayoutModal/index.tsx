import React from "react";
import * as S from './style'

interface ModalProp {
    titleName: string;
    titleRestName: string;
    children: React.ReactNode;
    setModalClose: () => void;
    loading?: boolean;
}

export default function ({
    children,
    titleName,
    titleRestName,
    setModalClose,
    loading
}: ModalProp) {
    return (
        <S.Container>
            <S.Content>
                <S.Title>
                    <strong>{titleName}{'>'}</strong>{titleRestName}
                </S.Title>
                {children}

            <S.Actions>
                <S.Cancel onClick={setModalClose}>Cancelar</S.Cancel>
                <S.Save type="submit" disabled={loading}>
                    {loading ? 'Salvando...' : 'Salvar'}
                </S.Save>
            </S.Actions>
            </S.Content>
        </S.Container>
    )
}