import React, { useState } from 'react';
import * as S from './styles';
import { CiSearch } from 'react-icons/ci';

interface IFildeSearch {
  onSearch: (searchTerm: string) => void;
}

export default function FieldSearch({ onSearch }: IFildeSearch) {
  const [inputValue, setInputValue] = useState('');

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(inputValue.trim()); // Trim the search term to remove leading/trailing spaces
  };
  return (
    <S.Container>
      <button onClick={handleSearch}>
        <CiSearch />
      </button>
      <input
        type="text"
        placeholder="Digite um item buscado"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </S.Container>
  );
}
