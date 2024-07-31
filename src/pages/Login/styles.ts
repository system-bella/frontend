import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

export const ContentForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 60%;
  color: ${(props) => props.theme.colors.black};

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

export const Label = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;

  margin-top: 50px;

  font-size: 16px;
  h3 {
    color: ${(props) => props.theme.colors.black};
  }
  span {
    font-weight: 400;
    color: ${(props) => props.theme.colors.secondary.gray_100};
  }
`;

export const Error = styled.div`
  margin: 30px 0;
  p {
    color: ${(props) => props.theme.colors.danger};
    font-weight: 600;
  }
`;

export const Form = styled.form`
  small {
    color: ${(props) => props.theme.colors.warning};
  }
`;

export const InputEmail = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
`;

export const Input = styled.input`
  width: 400px;
  height: 56px;
  padding: 10px 16px;
  border: 1px solid ${(props) => props.theme.colors.secondary.gray_100};
  border-radius: 6px;

  &::placeholder {
    font-size: 16px;
  }
`;

export const InputPassword = styled.div`
  margin-bottom: 25px;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  div > input {
    width: 90%;
    height: 56px;
    padding: 10px 16px;
    border-top: 1px solid ${(props) => props.theme.colors.secondary.gray_100};
    border-left: 1px solid ${(props) => props.theme.colors.secondary.gray_100};
    border-bottom: 1px solid ${(props) => props.theme.colors.secondary.gray_100};

    border-radius: 6px 0 0 6px;

    &::placeholder {
      font-size: 16px;
    }
  }
`;

export const ButtonLook = styled.button`
  width: 10%;
  height: 56px;
  background-color: transparent;

  border-top: 1px solid ${(props) => props.theme.colors.secondary.gray_100};
  border-right: 1px solid ${(props) => props.theme.colors.secondary.gray_100};
  border-bottom: 1px solid ${(props) => props.theme.colors.secondary.gray_100};

  border-radius: 0px 6px 6px 0;

  svg {
    font-size: 24px;
    color: ${(props) => props.theme.colors.secondary.gray_100};
  }
`;

export const Login = styled.button`
  width: 400px;
  height: 56px;
  padding: 10px;

  margin-top: 30px;

  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.white};
  border-radius: 6px;

  font-size: 16px;
`;

export const ImgLateral = styled.div`
  width: auto;
  display: flex;
  justify-content: end;
  img {
    width: 100%;
    height: 100vh;
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;
