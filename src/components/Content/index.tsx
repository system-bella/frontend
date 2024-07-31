import { ReactNode } from 'react';
import * as S from './styles';

interface IContectProps {
  children: ReactNode;
}

export default function Content({ children }: IContectProps) {
  return <S.Container>{children}</S.Container>;
}
