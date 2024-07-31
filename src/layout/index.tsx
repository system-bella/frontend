import * as S from './styles';

//components
import Aside from '../components/Aside';
import Content from '../components/Content';

export default function Layout({ children }: any) {
  return (
    <S.Container>
      <Aside />
      <Content>{children}</Content>
    </S.Container>
  );
}
