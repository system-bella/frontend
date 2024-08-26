import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(0,0,0, 0.15);
  z-index: 1000;

  display: flex;
  justify-content: center;
  align-items: center;

  input[type='text']{
    border: 1px solid ${(props) => props.theme.colors.secondary.gray_100};
    border-radius: 6px;
    padding: 10px 16px;
    &::placeholder {
      font-size: 16px;
    }
    width: 100%;
    height: 44px;
    }
  `;
export const ContentModel = styled.div`
  max-width: 500px;
  position: fixed;
  background-color: ${(props) => props.theme.colors.white};

  border: 1px solid ${(props) => props.theme.colors.secondary.gray_100};
  border-radius: 16px;

  -webkit-box-shadow: 7px 8px 29px -16px rgba(66, 68, 90, 1);
  -moz-box-shadow: 7px 8px 29px -16px rgba(66, 68, 90, 1);
  box-shadow: 7px 8px 29px -16px rgba(66, 68, 90, 1);
`;

// background form
export const ContentForm = styled.div`
  margin: 20px;
`;
// formulário
export const Form = styled.form`
  div {
    display: flex;
  }
`;

// conten label+input
export const FormInput = styled.div`
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

export const Filter = styled.select`
  border: 1px solid ${(props) => props.theme.colors.secondary.gray_100};
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 6px;
  padding: 10px 16px;
  width: 210px;
  height: 44px;
  max-width: 100%; // Garante que o select não ultrapasse o limite da div

  @media (max-width: 700px) {
    width: 150px;
  }

`;

export const TextArea = styled.textarea`
  border: 1px solid ${(props) => props.theme.colors.secondary.gray_100};
  border-radius: 6px;
  padding: 10px 16px;
  &::placeholder {
    font-size: 16px;
  }
`;

export const Actions = styled.div`
  margin: 50px 10px 10px 10px;
  display: flex;
  justify-content: end;
`;

export const Cancel = styled.button`
  font-size: 16px;
  color: ${(props) => props.theme.colors.black};
  padding: 10px;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.colors.black};
  border-radius: 10px;

  margin-right: 20px;
`;

export const Save = styled.button`
  margin-left: 16px;

  font-size: 16px;
  color: ${(props) => props.theme.colors.white};

  background-color: ${(props) => props.theme.colors.primary};

  padding: 10px;
  border-radius: 10px;
`;

export const ListModal = styled.div`
  position: relative;
`

export const ListDados = styled.div`
  position: absolute;
  top: 45px;
  width: 100%;
`

