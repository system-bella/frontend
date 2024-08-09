import styled from "styled-components";

export const Container = styled.div`
 display: flex;
 flex-direction: column;
 gap: 30px;
 font-size: 14px;
 padding: 40px;
 h2{
    text-align: center;
 }
`

export const Content = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 gap: 30px;
`

export const TitleHead = styled.header`
 display: flex;
 align-items: center;
 justify-content: center;
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
 gap: 20px;
 width: 100%;
`

export const Grafico = styled.div`
  height: 280px;
  width: 100%;
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

export const TitleBlack = styled.p`
  font-weight: 800;
  font-size: 18px;
  margin-bottom: 5px;
`