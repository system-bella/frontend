import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`

export const Content = styled.div`
    flex: 1;
`
export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 36px;

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
  align-items: center;
  flex-direction: row;
  gap: 20px;

  div {
    display: flex;
    justify-content: space-between;
  }
`;

export const NewItem = styled.button`
  width: 100px;
  padding: 10px 16px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  color: ${(props) => props.theme.colors.white};

  background-color: ${(props) => props.theme.colors.primary};

  border-radius: 12px;

  svg {
    font-size: 24px;
  }

  span {
    font-size: 16px;
    margin-left: 8px;
  }
`;

export const InforUser = styled.div`
  display: flex;
  align-items: center;
`

export const Imagem = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  width: 100px; /* Defina o tamanho do círculo */
  height: 100px; /* Defina o tamanho do círculo */
  border-radius: 50%; /* Faz com que o contêiner seja um círculo */
  overflow: hidden; /* Garante que a imagem não ultrapasse os limites do círculo */
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.4);

  p{
    font-size: 44px;
    color: ${(props) => props.theme.colors.white};
  }
    
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

`
export const Infor = styled.div`
  margin-left: 20px;
  h2 {
      margin: 0;
  }
  p {
      margin: 5px 0;
  }
`

export const Footer = styled.footer`
  border-top: 1px solid ${(props) => props.theme.colors.black};
  margin-top: 50px;

  padding: 10px 0;
`;