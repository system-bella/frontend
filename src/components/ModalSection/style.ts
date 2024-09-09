import styled from "styled-components";

export const Container = styled.div`
    position: fixed;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 1000;
    background-color: rgb(0, 0, 0, 0.3);

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Content = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
    
  background-color: white;
  padding: 26px 30px;

  border-radius: 16px;
  box-shadow: 7px 8px 29px -16px rgba(66, 68, 90, 1);
`;

export const InputDuple = styled.div`
    display: flex;
    align-items: center;
    margin-top: 10px;

    svg {
        color: gray;;
        font-size: 24px;
    }
    
    div {
        margin-left: 20px;
    }

    div > h4 {
        color: ${props => props.theme.colors.primary}
    }

    div > p {
        color: gray;
    }
`;

export const Footer = styled.div`
    margin-top: 50px;
    display: flex;
    justify-content: end;
    gap: 30px;

    button {
        display: flex;
        justify-content: center;
        align-items: center;

        border-radius: 4px;
        
        padding: 8px;
    }
`;

export const ButtonCancel = styled.button`
   border: 1px solid ${props => props.theme.colors.primary};
   color: ${props => props.theme.colors.primary};
   background: transparent;
`;

export const ButtonDelete = styled.button`
    background: ${props => props.theme.colors.warning};
    color: ${props => props.theme.colors.white};

    opacity: ${props => props.disabled ? 0.6 : 1};
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};

    svg {
        font-size: 24px;
        color: ${props => props.theme.colors.white}
    }
`;