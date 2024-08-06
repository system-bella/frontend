import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
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

export const Form = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 15px 10px 0px;

  label {
    font-size: 16px;
    color: ${(props) => props.theme.colors.black};
  }
`;

export const Input = styled.input`
  width: 350px;
  border: 1px solid ${(props) => props.theme.colors.secondary.gray_100};
  padding: 10px;
  border-radius: 10px;
  &::placeholder {
    font-size: 16px;
  }
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: end;
`;
