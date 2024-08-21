import * as S from './styles';

interface IButtonProps {
  label: string;
  handleClick: any;
}

export default function ButtonAutolineCancel({ label, handleClick }: IButtonProps) {
  return <S.Container onClick={handleClick}>{label}</S.Container>;
}
