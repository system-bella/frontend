import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Content = styled.div`
  flex: 1;
`;

export const Header = styled.header`  
  div {
    display: flex;
    justify-content: space-between;
  }
  `;

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

export const BodyTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  td,
  th {
    text-align: center;
    padding: 12px 0;
  }

  tr:nth-child(odd) {
    background-color: ${(props) => props.theme.colors.white};
  }
  tr:nth-child(even) {
    background-color: ${(props) => props.theme.colors.secondary.gray_50};
    border-color: red;
  }

  td > div {
    //background-color: red;
    display: flex;
    justify-content: space-around;
  }

  td > div > button {
    background-color: transparent;
  }

  td > div > button > svg {
    font-size: 20px;
  }

  @media (max-width: 700px) {
    th:nth-child(5), 
    td:nth-child(5) {
      display: none;
    }
  }
`;

export const Footer = styled.footer`
  border-top: 1px solid ${(props) => props.theme.colors.black};
  margin-top: 50px;

  padding: 10px 0;
`;
