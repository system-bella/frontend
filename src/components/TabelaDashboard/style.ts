import styled from "styled-components";

export const Container = styled.div`
margin-top: 10px;
`

export const BodyTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  td,
  th {
    text-align: center;
    padding: 10px 0;
  }
  
  thead > tr > th {
    background-color: ${(props) => props.theme.colors.white};
  }
  
  tr:nth-child(odd) {
    background-color: ${(props) => props.theme.colors.secondary.gray_50};
  }
  tr:nth-child(even) {
    background-color: ${(props) => props.theme.colors.white};
  }

  td > div {
    display: flex;
    justify-content: space-around;
  }

  td > span > button {
    background-color: transparent;
    margin: 0 10px;
  }

  td > span > button > svg {
    font-size: 20px;
  }

  @media (max-width: 900px) {
    th:nth-child(5), 
  td:nth-child(5) {
    display: none;
  }
  }
`;