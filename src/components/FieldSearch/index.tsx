import React, { useState } from 'react';
import * as S from './styles';
import { CiSearch } from 'react-icons/ci';

interface IFildeSearch {
  onSearch: any;
}

export default function FieldSearch({ onSearch }: IFildeSearch) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(event.target.value);
    if (value === '') {
      onSearch('')
    }
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(inputValue.trim());
  };
  console.log(onSearch);
  return (
    <S.Container>
      <input
        type="text"
        placeholder="Digite um item buscado"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>
        <CiSearch />
      </button>
    </S.Container>
  );
}
