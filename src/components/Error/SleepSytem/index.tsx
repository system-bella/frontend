import styled from 'styled-components';
export default function Sleep() {
    return (
        <Container>
            <h4>Parece que você precisa logar novamente.</h4>
            <img src={require('../../../assets/sleep.png')} alt="sleep.png"/>
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