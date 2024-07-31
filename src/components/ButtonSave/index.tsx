import * as S from './styles';

interface IButtonSave {
  label: string;
}

export default function ButtonSave({ label }: IButtonSave) {
  return <S.Container>{label}</S.Container>;
}
