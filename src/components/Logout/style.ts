import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  background-color: rgb(0,0,0, 0.2);

  display: flex;
  justify-content: center;
`;

export const ContentModel = styled.div`
    position: fixed;
    
    margin-top: 20px;
    width: 424px;
    height: 166px;
    background-color: ${(props) => props.theme.colors.white};
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    
    border: 1px solid ${(props) => props.theme.colors.secondary.gray_100};
    border-radius: 16px;
    
    -webkit-box-shadow: 7px 8px 29px -16px rgba(66, 68, 90, 1);
    -moz-box-shadow: 7px 8px 29px -16px rgba(66, 68, 90, 1);
    box-shadow: 7px 8px 29px -16px rgba(66, 68, 90, 1);


  @media (max-width: 700px) {
    width: 90%;
  }
  `;

export const InfoModel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.black};
  margin-top: 23px;

  svg {
    font-size: 24px;
    margin-right: 10px;
  }

  div {
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  & span {
    font-weight: bold;
    font-size: 16px;
    padding: 0px;
    margin: 0px;
    color: ${(props) => props.theme.colors.black};
  }

  & small {
    font-weight: 400;
    font-size: 16px;
    color: ${(props) => props.theme.colors.secondary.gray_100};
  }
`;

export const Action = styled.div`
  display: flex;
  justify-content: end;
  margin: 23px 36px;

  button {
    padding: 10px;
    border-radius: 10px;
  }
`;

export const Cancel = styled.button`
  background-color: transparent;
  color: ${(props) => props.theme.colors.black};
  border: 1px solid ${(props) => props.theme.colors.black};
`;

export const Confirm = styled.button`
  background-color: ${(props) => props.theme.colors.danger};
  color: ${(props) => props.theme.colors.white};
  margin-left: 16px;
`;
