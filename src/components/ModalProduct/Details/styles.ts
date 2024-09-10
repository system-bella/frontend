import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  background-color: rgb(0, 0, 0, 0.3);

  display: flex;
  justify-content: end;
  align-items: center;
`;

export const Content = styled.div`
  position: fixed;
  width: 35%;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.white};
  
  padding: 32px;
  
  border: 1px solid ${(props) => props.theme.colors.secondary.gray_100};
  border-radius: 32px 0 0 32px;

  @media (max-width: 900px) {
    width: 90%;
  }
  `;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    background-color: transparent;
  }
  
  button > svg {
    font-size: 24px;
    margin-right: 10px;
  }
  `;

export const Title = styled.div`
  display: flex;
  align-items: center;
  
  svg {
    font-size: 24px;
    margin-right: 10px;
  }
  `;

export const MainInformation = styled.div`
  margin-top: 30px;
  width: 100%;
  h4 {
    margin-bottom: 30px;
  }
  `;

export const DivideInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  `;

export const Info = styled.div`
  display: flex;
  div {
    width: 50%;
  }
  
  div {
    margin-bottom: 15px;
  }
  `;

export const InfoDescription = styled.div`
  display: flex;
  gap: 8px;
  
  div {
    width: 60%;
    margin-bottom: 15px;
  }
`;

export const InfoQr = styled.div`
  display: flex;
`;


export const TituloH5 = styled.h5`
  font-weight: 600;
  color: ${(props) => props.theme.colors.black};
  font-size: 16px;
  
  @media (max-width: 900px) {
    font-size: 14px;
  }
  `

export const InforSpan = styled.span`
  font-size: 16px;
  color: ${(props) => props.theme.colors.secondary.gray_100};
  word-break: break-word; /* Garante que palavras longas sejam quebradas */
  overflow-wrap: break-word; /* Garante que a quebra aconteça corretamente */

  @media (max-width: 900px) {
    font-size: 14px;
  }
`