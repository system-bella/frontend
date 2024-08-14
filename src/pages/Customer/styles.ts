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
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 20px;
  margin-bottom: 36px;

  div {
    display: flex;
    justify-content: space-between;
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;

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
`;

export const Footer = styled.footer`
  border-top: 1px solid ${(props) => props.theme.colors.black};
  margin-top: 50px;

  padding: 10px 0;
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