import styled from 'styled-components';
export default function Erro429() {
    return (
        <Container>
            <h4>Parece que você fez muitas requisições.</h4>
            <p>Espere um pouco e tente novamente.</p>
            <img src={require('../../../assets/Error429.png')} alt="sleep.png"/>
        </Container>
    );
}

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    width: 100%;
    height: 100%;
    
    h4, p{
        color: ${(props) => props.theme.colors.warning};
    }
    
    img {
        width: 40%;
    }
`;