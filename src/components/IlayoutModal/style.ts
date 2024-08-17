import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(0,0,0, 0.15);
  z-index: 1000;

  display: flex;
  justify-content: center;
  align-items: center;
`

export const Content = styled.div` 
    border: 1px solid ${(props) => props.theme.colors.secondary.gray_100};
    border-radius: 16px;
    width: 500px;
    font-size: 15px;
    padding: 8px;
    background-color: ${(props) => props.theme.colors.white};
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 10px;

    display: flex;
    flex-direction: column;
    padding: 20px;
`

export const Title = styled.span`
`

export const Actions = styled.div`
  margin: 50px 10px 10px 10px;
  display: flex;
  justify-content: end;
`;

export const Cancel = styled.button`
  font-size: 16px;
  color: ${(props) => props.theme.colors.black};
  padding: 10px;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.colors.black};
  border-radius: 10px;

  margin-right: 20px;
`;

export const Save = styled.button`
  margin-left: 16px;

  font-size: 16px;
  color: ${(props) => props.theme.colors.white};

  background-color: ${(props) => props.theme.colors.primary};

  padding: 10px;
  border-radius: 10px;
`;