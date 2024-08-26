import styled from 'styled-components';

export const Container = styled.div`
  display: grid;

  grid-template-columns: 220px auto;
  grid-template-areas: 'AS CT' 'AS CT';

  height: 100vh;

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
  }
`;
