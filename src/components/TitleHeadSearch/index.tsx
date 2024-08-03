import styled from "styled-components";
import React from "react";
import { CiSearch, CiCirclePlus } from 'react-icons/ci';

export default function TitleHeadSearch() {
    return (
        <Container>
            <Title>
                <span>
                    Produtos{'>'}
                    <small>Todos os produtos</small>
                </span>
            </Title>

            <Right>
                <Search>
                    <CiSearch />
                    <input
                        type="text"
                        placeholder="Digite um item buscado"
                    />
                </Search>

                <ButtonNew>
                    <CiCirclePlus />
                    <span>Novo</span>
                </ButtonNew>
            </Right>
        </Container>
    )
}

export const Container = styled.div`
    display: flex;
    align-items: baseline;
    justify-content: space-between;
`

export const Right = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 20px;
`

export const Title = styled.div`
    margin-bottom: 32px;

    span {
    font-size: 16px;
    font-weight: bold;
    }

    span > small {
    font-weight: 300;
    }
`

export const Search = styled.div`
    border: 1px solid ${(props) => props.theme.colors.black};
    border-radius: 10px;

    input {
        padding: 10px;
        border-radius: 10px;

        color: ${(props) => props.theme.colors.black};
        font-size: 16px;
    }

    svg{
        font-size: 16px;
        color: ${(props) => props.theme.colors.black};
        margin-left: 20px;
    }
`

export const ButtonNew = styled.button`
width: 100px;
  padding: 10px 16px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  color: ${(props) => props.theme.colors.white};

  background-color: ${(props) => props.theme.colors.primary};

  border-radius: 12px;

  svg {
    font-size: 24px;
  }

  span {
    font-size: 16px;
    margin-left: 8px;
  }
    
`
