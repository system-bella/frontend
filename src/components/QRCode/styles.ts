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
    height: 65px;
  }

  p {
    font-size: 16px;
    color: ${(props) => props.theme.colors.black};
  }
  h1 {
    font-size: 24px;
    color: ${(props) => props.theme.colors.black};
  }
`;

export const CaputureQrcode = styled.button`
  border-radius: 12px;
  padding: 12px 12px;
  background-color: ${(props) => props.theme.colors.primary};

  color: ${(props) => props.theme.colors.white};
  font-size: 16px;

  &:hover{
    background-color: #e976a8;
  }
`;
