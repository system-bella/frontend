import * as S from './styles';

interface IFilter {
  filter: string[];
  onChange: (value: string | null) => void;
}

export default function Filter({ filter, onChange }: IFilter) {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue =
      event.target.value === 'Filtos' ? null : event.target.value;
    onChange(selectedValue);
  };
  return (
    <S.Filter id="selection" name="Filtro" onChange={handleSelectChange}>
      <option value="Filtos">Filtro</option>
      {filter.map((value, index) => (
        <option key={index} value={value}>
          {value}
        </option>
      ))}
    </S.Filter>
  );
}
