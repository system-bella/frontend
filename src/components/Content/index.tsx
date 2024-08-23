import { ReactNode } from 'react';
import styled from 'styled-components';

interface IContectProps {
  children: ReactNode;
}

export default function Content({ children }: IContectProps) {
  return <Container>{children}</Container>;
}

export const Container = styled.div`
  grid-area: CT;
  padding: 40px 90px;
  
  color: ${(props) => props.theme.colors.black};
  
  height: calc(100vh);
  overflow-y: scroll;
  
  @media (max-width: 900px) {
    padding: 40px;
  }
`;
