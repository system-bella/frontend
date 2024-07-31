import * as S from './styles';

interface INewProps {
  icon: any;
  title: string;
  url: string;
}

export default function NewItem({ icon, title, url }: INewProps) {
  return (
    <S.NewProduct href={url}>
      {icon}
      <span>{title}</span>
    </S.NewProduct>
  );
}
