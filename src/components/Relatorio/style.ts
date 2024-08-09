import styled from "styled-components";

export const Container = styled.div`
 /* display: flex;
 align-items: center;
 flex-direction: column;
 height: 100vh; */
`

export const TitleHead = styled.header`
 display: flex;
 gap: 30px;

 img{
    height: 70px;
 }
`

export const Infor = styled.div`
`

export const Data = styled.div`
`

export const DivValores = styled.div`
 display: flex;
 gap: 30px;
 width: 100%;
`

export const Grafico = styled.div`
 height: 200px;
  width: 70%;
  border: 1px solid #9D9D9D;
  border-radius: 16px;
  box-shadow: 0px 4px 4px 0px #c1c1c1;
  padding: 15px;
`

export const Tabela = styled.table`
 width: 100%;
 border-collapse: collapse;

 td,
  th {
    text-align: center;
    padding: 10px 0;
  }
`