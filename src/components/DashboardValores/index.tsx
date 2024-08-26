import React from "react";
import * as S from './style'

interface Porps {
    title: string,
    icon: any,
    valor: string
}

export default function DashboardValores(
    {
        title,
        icon,
        valor
    }: Porps) {
    return (
        <S.Container>
            <S.ContainerTop>
                <S.Title_gray>
                    {title}
                </S.Title_gray>
                <S.Icon>
                    {icon}
                </S.Icon>
            </S.ContainerTop>

            <S.Valor>
                {valor}
            </S.Valor>
        </S.Container>
    )
}