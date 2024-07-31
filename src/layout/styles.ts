import styled from 'styled-components';

export const Container = styled.div`
  display: grid;

  grid-template-columns: 300px auto;
  //grid-template-rows: auto;
  grid-template-areas: 'AS CT' 'AS CT';

  height: 100vh;
`;
