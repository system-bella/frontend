import styled from 'styled-components';

export const Container = styled.div``;

export const PrintQrcode = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 20px;
`;

export const Label = styled.div`
  margin-left: 20px;

  img {
    width: 80%;
  }

  p {
    font-size: 18px;
    color: ${(props) => props.theme.colors.black};
  }
  h1 {
    font-size: 30px;
    color: ${(props) => props.theme.colors.black};
  }
`;

export const CaputureQrcode = styled.button`
  border-radius: 12px;
  padding: 10px 16px;
  height: 56px;
  background-color: ${(props) => props.theme.colors.primary};

  color: ${(props) => props.theme.colors.white};
  font-weight: 400;
  font-size: 16px;
`;
