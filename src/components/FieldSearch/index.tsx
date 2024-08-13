import React, { useState } from 'react';
import * as S from './styles';
import { CiSearch } from 'react-icons/ci';

interface IFildeSearch {
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FieldSearch({ onSearch }: IFildeSearch) {
  return (
    <S.Container>
      <button>
        <CiSearch />
      </button>
      <input
        type="text"
        placeholder="Digite um item buscado"
        onChange={onSearch}
      />
    </S.Container>
  );
}
