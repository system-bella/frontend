/* eslint-disable jsx-a11y/iframe-has-title */
import styled from 'styled-components';
import { Oval } from 'react-loader-spinner'

export default function Loading() {
    return (
        <Container>
            <Content>
                <Oval
                secondaryColor=""
                    visible={true}
                    height="80"
                    width="80"
                    color="#DF3B82"
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    // strokeWidth={8}
                />
                <Title>
                    Carregando...
                </Title>
            </Content>
        </Container>
    );
}



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
  gap: 10px;

  justify-content: center;
  align-items: center;

  background-color: white;
  padding: 26px 30px;
  
  border-radius: 4px;
  `;

export const Title = styled.p`
    color: #DF3B82;
`