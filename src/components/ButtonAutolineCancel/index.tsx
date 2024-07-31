import * as S from './styles';

interface IButtonProps {
  label: string;
}

export default function ButtonAutolineCancel({ label }: IButtonProps) {
  return <S.Container>{label}</S.Container>;
}
