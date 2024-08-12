import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100%;
  `;

export const Content = styled.div`
  flex: 1;
`;

export const Title = styled.div`
  margin-bottom: 32px;
  
  span {
    font-size: 16px;
    font-weight: bold;
  }
  
  span > small {
    font-weight: 300;
  }
  `;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  div {
    display: flex;
    justify-content: space-between;
  }
`;

export const ContainerBloc = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`
export const ContentLeft = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;
  gap: 15px;
`

export const Filter = styled.select`
  border: 2px solid #ef9dc0;
  border-radius: 10px;
  padding: 12px 10px;
  display: flex;
  width: 100%;
  font-size: 1em;

  background-color: ${(props) => props.theme.colors.white};
`;

export const ContentRight = styled.div`
  width: 60%;
`

export const ListProduct = styled.div`
  border: 2px solid #ef9dc0;
  border-radius: 8px;
  max-height: 350px;
  height: 320px;
  overflow-y: auto;
`;

export const TableProduct = styled.table`
  width: 100%;
  border-collapse: collapse;

  td,
  th {
    text-align: center;
    padding: 5px 0;
  }

  tbody {
    overflow-y: hidden;
    max-height: 100px;
  }
  button{
    background-color: transparent;
  }
  svg{
    font-size: 18px;
    color: ${(props) => props.theme.colors.warning};
  }

  svg:hover{
    color: red;
  }
`;

export const FormTotal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  
  button {
    background-color: white;
    color: red;
  }
  div{
    width: 50%;
  }
`;

export const ValoresT = styled.p`
  border: 2px solid #ef9dc0;
  border-radius: 10px;
  padding: 12px;
  display: flex;
  font-size: 1em;
  color: #9d9d9d;
  background-color: ${(props) => props.theme.colors.white};
`

export const DivDuple = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 10px;
  gap: 15px;
`;

export const InputLeft =styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
`

export const InputRight = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;

`

export const Button = styled.button`
  padding: 10px 16px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 12px;
  font-size: 16px;

  span {
    font-size: 16px;
    margin-left: 8px;
  }
`;

export const DivInput = styled.div`
  width: 300px;
  border: 1px solid ${(props) => props.theme.colors.black};
  padding: 12px 10px;
  border-radius: 10px;
  font-size: 1em;
  
  input{
    &::placeholder {
      font-size: 16px;
    }
    
  }
  
  button {
    width: 20%;
    font-size: 1em;
    background-color: ${(props) => props.theme.colors.white};
    border-radius: 10px;
  }
`;

export const InputSmall = styled.input`
  margin-right: 25px;
  width: 90px;
  border: 1px solid ${(props) => props.theme.colors.black};
  padding: 12px 10px;
  border-radius: 10px;
  text-align: center;
  font-size: 1em;
  &::placeholder {
    font-size: 16px;
  }
`;

export const Footer = styled.footer`
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
`;

