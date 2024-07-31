import * as S from './styles';

import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

interface IPaginationProps {
  nextPage: () => void;
  prevPage: () => void;
  perPage: undefined;
  lastPage: undefined;
  currentPage: number;
}

export default function Pagination({
  nextPage,
  prevPage,
  perPage,
  lastPage,
  currentPage
}: IPaginationProps) {
  return (
    <S.Container>
      <S.InfoPagination>
        <small>{perPage}</small>
        <span>Itens exibidos por página</span>
      </S.InfoPagination>

      <S.Pagination>
        <span>
          {currentPage} de {lastPage}
        </span>
        <div>
          <button onClick={prevPage}>
            <SlArrowLeft />
          </button>
          <button onClick={nextPage}>
            <SlArrowRight />
          </button>
        </div>
      </S.Pagination>
    </S.Container>
  );
}
