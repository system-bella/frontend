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
`;

export const ContainerBloc = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;

  small {
    color: ${(props) => props.theme.colors.warning};
  }
`
export const ContentLeft = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;
  gap: 15px;
`

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
  font-size: 1.2em;
  background-color: ${(props) => props.theme.colors.white};
`

export const DivDuple = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 10px;
  gap: 15px;
`;

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

export const Footer = styled.footer`
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
`;

export const Input = styled.input`
  border: 2px solid #ef9dc0;
  border-radius: 10px;
  padding: 12px 10px;
  width: 100%;
  font-size: 1em;
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

export const ListDados = styled.ul`
  width: 100%;
  position: absolute;
  top: 55px;
  border: 1px solid ${(props) => props.theme.colors.secondary.gray_100};
  border-radius: 16px;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 10px;
  
  span{
    display: flex;
    gap: 10px;
  }

  li{
    list-style: none;
    display: flex;
    justify-content: space-between;
    padding: 3px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 16px;
  }
  
  li:hover{
    background-color: ${(props) => props.theme.colors.primary};
    color: white;

    button{
      color: white;
    }
  }

  button{
    background-color: transparent;
    padding: 10px 16px;
    text-align: start;
    margin-left: 5px;
    width: 100%;
  }
`

export const HeaderSearch = styled.div`
  display: flex;
  gap: 20px;
`

export const InputLeft = styled.div`
  width: 15%;
  `
export const InputRight = styled.div`
  width: 60%;
  position: relative;
`
export const DivInput = styled.div`
  width: 300px;
  display: flex;
  border: 2px solid #ef9dc0;
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

export const Save = styled.button`
  margin-left: 16px;

  font-size: 16px;
  color: ${(props) => props.theme.colors.white};

  background-color: ${(props) => props.theme.colors.primary};

  padding: 10px;
  border-radius: 10px;

  &:hover{
    background-color: #ef9dc0;
  }
`;

// conten label+input
export const FormInput = styled.div`
  display: flex;
  flex-direction: column;

  small {
    color: ${(props) => props.theme.colors.warning};
  }

  .imask{
    border: 1px solid ${(props) => props.theme.colors.secondary.gray_100};
    border-radius: 6px;
    padding: 10px 16px;

    &::placeholder {
      font-size: 16px;
    }

    width: 100%;
    height: 44px;
  }

  input[type='text']{
    border: 2px solid #ef9dc0;
    border-radius: 10px;
    padding: 12px 10px;
    width: 100%;
    font-size: 1em;
    }
`;
