import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  position: relative;
`;

export const Title = styled.div`
  width: 100%;
  position: absolute;
  top: 0;

  span {
    font-size: 16px;
    font-weight: bold;
  }

  span > small {
    font-weight: 300;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  width: 55%;
`;

export const InputForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 20px;
  small {
    color: ${(props) => props.theme.colors.warning};
  }
`;

export const Input = styled.input`
  width: 380px;
  border: 1px solid ${(props) => props.theme.colors.secondary.gray_100};
  padding: 16px;
  border-radius: 6px;
  &::placeholder {
    font-size: 16px;
  }
`;

export const TextArea = styled.div`
  width: 100%;
  small {
    color: ${(props) => props.theme.colors.warning};
  }
`;

export const TextAreaField = styled.input`
  width: 100%;
  height: 100px;
  border: 1px solid ${(props) => props.theme.colors.secondary.gray_100};
  padding: 16px;
  border-radius: 6px;
  &::placeholder {
    font-size: 16px;
  }
`;

export const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  margin-top: 40px;
`;

export const ButtonSave = styled.button`
  text-decoration: none;
  font-size: 16px;
  color: ${(props) => props.theme.colors.white};

  background-color: ${(props) => props.theme.colors.primary};

  padding: 10px;
  border-radius: 10px;
`;

export const ButtonAutolineCancel = styled.a`
  text-decoration: none;
  font-size: 16px;
  color: ${(props) => props.theme.colors.black};
  padding: 10px;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.colors.black};
  border-radius: 10px;

  margin-right: 20px;
`;
