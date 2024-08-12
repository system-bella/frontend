import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`

export const Content = styled.div`
    flex: 1;
`

export const InforUser = styled.div`
  display: flex;
  align-items: center;
`

export const Imagem = styled.div`
  width: 100px; /* Defina o tamanho do círculo */
  height: 100px; /* Defina o tamanho do círculo */
  border-radius: 50%; /* Faz com que o contêiner seja um círculo */
  overflow: hidden; /* Garante que a imagem não ultrapasse os limites do círculo */
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 1px 1px 4px 1px black;
    
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