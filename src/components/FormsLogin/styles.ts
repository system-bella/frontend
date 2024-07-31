import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  a {
    width: 400px;
    padding: 10px 16px;
    text-decoration: none;
    color: white;
    background-color: ${(props) => props.theme.colors.primary};
    margin-top: 30px;
    border-radius: 10px;
    text-align: center;
  }

  @media screen and (max-width: 768px) {
    a {
      width: 330px;
    }
  }
`;
export const Logo = styled.div`
  img {
    margin: 15px;
    height: 80px;
  }
`;
export const TextParagrafo = styled.div`
  margin: 20px 0px 30px 0px;
`;

export const ColorParagrafo = styled.div`
  color: #9d9d9d;
`;

export const Formulario = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  input[type='email'] {
    margin-bottom: 13px;
  }
  input[type='email'],
  input[type='password'],
  input[type='text'] {
    padding: 10px 16px;
    align-items: center;
    gap: 10px;
    font-size: 1em;
    border-radius: 10px;
    border: 1px solid #9d9d9d;
  }
  div > a {
    margin-top: 5px;
    color: #2d2f31;
    text-align: end;
    font-size: 0.8em;
    text-decoration-line: underline;
    background-color: white;
  }
  input[type='submit'] {
    margin-top: 30px;
    border-radius: 5px;
    background-color: #df3b82;
    border: none;
    padding: 10px;
    color: white;
  }
  div {
    display: flex;
    flex-direction: column;
  }

  @media screen and (max-width: 768px) {
    width: 330px;
  }
`;
export const PasswordContain = styled.div`
  position: relative;
  button {
    position: absolute;
    top: 60%;
    right: 10px;
    transform: translateY(-50%);
    background-color: white;
    font-size: 20px;
    color: #9d9d9d;
  }
`;
