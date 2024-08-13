import React, { useState } from "react";
import * as S from './style'

interface ModalProp {
    titleName: string;
    titleRestName: string;
    children: React.ReactNode;
    setModalClose: () => void;
    setModalFunctionRight: any;
    loading?: boolean;
}

export default function ({
    children,
    titleName,
    titleRestName,
    setModalClose,
    setModalFunctionRight,
    loading
}: ModalProp) {
    const [isLoading, setIsLoading] = useState(loading);

    const handleSaveClick = async () => {
        setIsLoading(true);
        try {
            await setModalFunctionRight();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <S.Container>
            <S.Content>
                <S.Title>
                    <strong>{titleName}{'>'}</strong>{titleRestName}
                </S.Title>
                {children}

                <S.Actions>
                    <S.Cancel onClick={setModalClose}>Cancelar</S.Cancel>
                    <S.Save
                        onClick={handleSaveClick}
                        type="submit"
                        disabled={loading}>
                        {loading ? 'Salvando...' : 'Salvar'}
                    </S.Save>
                </S.Actions>
            </S.Content>
        </S.Container>
    )
}