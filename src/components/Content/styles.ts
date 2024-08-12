import styled from 'styled-components';

export const Container = styled.div`
  grid-area: CT;
  padding: 40px 90px;

  color: ${(props) => props.theme.colors.black};

  height: calc(100vh);
  overflow-y: scroll;
`;
