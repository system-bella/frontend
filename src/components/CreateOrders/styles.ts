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

export const Fildset = styled.fieldset`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  label {
    color: #9d9d9d;
  }
`;

export const FormPagamento = styled.div``;

export const FormTotal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;

  button {
    background-color: white;
    color: red;
  }
`;

export const Filter = styled.select`
  margin-bottom: 15px;
  border: 2px solid #df3b82;
  border-radius: 10px;
  padding: 12px;
  display: flex;
  width: 300px;
  font-size: 1em;

  background-color: ${(props) => props.theme.colors.white};
`;

export const InputFildset = styled.input`
  margin-bottom: 15px;
  border: 2px solid #df3b82;
  border-radius: 10px;
  padding: 12px;
  display: flex;
  width: 300px;
  font-size: 1em;

  background-color: ${(props) => props.theme.colors.white};
`;

export const Input = styled.input`
  margin-left: 10px;
  width: 250px;
  border: 1px solid ${(props) => props.theme.colors.black};
  padding: 16px;
  border-radius: 10px;
  font-size: 1em;
  &::placeholder {
    font-size: 16px;
  }
`;
export const InputSmall = styled.input`
  margin-left: 10px;
  width: 120px;
  border: 1px solid ${(props) => props.theme.colors.black};
  padding: 16px;
  border-radius: 10px;
  text-align: center;
  font-size: 1em;
  &::placeholder {
    font-size: 16px;
  }
`;
export const InputLarge = styled.input`
  margin-bottom: 15px;
  border: 2px solid #df3b82;
  border-radius: 10px;
  padding: 12px;
  display: flex;
  width: 450px;
  font-size: 1em;

  background-color: ${(props) => props.theme.colors.white};
`;
export const InputDesconto = styled.select`
  margin: 0px 30px 0px 0px;
  border: 2px solid #df3b82;
  border-radius: 10px;
  padding: 12px;
  display: flex;
  width: 120px;
  font-size: 1em;

  background-color: ${(props) => props.theme.colors.white};
`;

export const DivLateral = styled.div`
  display: flex;
`;

export const ListProduct = styled.div`
  border: 2px solid #df3b82;
  border-radius: 10px;
  max-height: 250px;
  height: 250px;
  overflow-y: auto;
`;
export const TableProduct = styled.table`
  th {
    padding: 5px 30px 5px 5px;
  }
  td {
    text-align: center;
  }
  tbody {
    overflow-y: hidden;
    max-height: 100px;
  }
`;
export const Footer = styled.footer`
  /* margin-top: 5px; */
  display: flex;
  justify-content: space-around;
`;
