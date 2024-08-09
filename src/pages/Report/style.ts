import styled from "styled-components";

export const Container = styled.div`
`

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

export const NewItem = styled.button`
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

export const ContainerVal = styled.div`
  display: flex;
  gap: 30px;
`

export const ContainerTop = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 30px;
  height: 280px;
  `
export const DivLeft = styled.div`
  width: 70%;
  border: 1px solid #9D9D9D;
  border-radius: 16px;
  box-shadow: 0px 4px 4px 0px #c1c1c1;
  padding: 15px;

  display: flex;
  flex-direction: column;
  `

export const DivRight = styled.div`
  width: 30%;
  border: 1px solid #9D9D9D;
  border-radius: 16px;
  box-shadow: 0px 4px 4px 0px #c1c1c1;
  padding: 15px;
  display: flex;
  flex-direction: column;
  `

export const ContainerBottom = styled.div`
  margin-top: 30px;
  border: 1px solid #9D9D9D;
  border-radius: 16px;
  box-shadow: 0px 4px 4px 0px #c1c1c1;
  padding: 15px;
`

export const TitleBlack = styled.p`
  font-weight: 800;
  font-size: 18px;
  margin-bottom: 5px;
`