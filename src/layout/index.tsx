import * as S from './styles';

//components
import Aside from '../components/Aside';
import Content from '../components/Content';
// import { useUser } from '../api/contextApi/userContext';
// import { useHistory } from 'react-router-dom';

export default function Layout({ children }: any) {
  // const { user } = useUser();
  // const history = useHistory();

  // console.log('userrrrrr: ', user);

  // if (!user) {
  //   history.push('/PageTest');
  //   window.location.reload();
  // }

  return (
    <S.Container>
      <Aside />
      <Content>{children}</Content>
    </S.Container>
  );
}
