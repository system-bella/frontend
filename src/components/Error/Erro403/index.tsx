import styled from 'styled-components';
export default function Erro403() {
    return (
        <Container>
            <h4>Você não possui autorização para acessar esta página!</h4>
            <img src={require('../../../assets/403.png')} alt="Forbidden403"/>
        </Container>
    );
}

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100vh;

    h4{
        color: ${(props) => props.theme.colors.warning};
    }

    img {
        width: 40%;
    }
`;