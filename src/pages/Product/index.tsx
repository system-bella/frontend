import { useState, useEffect } from 'react';
import axios from '../../api/axios';

// styles
import * as S from './styles';

// components
import FieldSearch from '../../components/FieldSearch';
import Filter from '../../components/Filter';
import Modal from '../../components/ModalDelete';
//import NewItem from '../../components/NewItem';
import Pagination from '../../components/Pagination';
import ModalDetails from '../../components/ModalDetails';
import ModalEdit from '../../components/ModalEdite';

// icons
import { CiCirclePlus, CiTrash, CiEdit } from 'react-icons/ci';
import { PiClipboardTextThin } from 'react-icons/pi';
import ModalCreate from '../../components/ModalCreate';

interface IData {
  id: number;
  reference: number;
  barcode: number;
  category: string;
  quantity: number;
  name_product: number;
  price: string;
}

export default function Product() {
  const [items, setItems] = useState<IData[] | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState();
  const [lastPage, setLastPage] = useState();

  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalDetails, setOpenModalDetails] = useState(false);
  const [openModalEdite, setOpenModalEdite] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  function currencyFormat(value: number): string {
    //configura as opções para o formato de moeda brasileira
    const options: Intl.NumberFormatOptions = {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    };
    // Formatando o número como moeda brasileira
    const formatoMoeda = value.toLocaleString('pt-BR', options);

    return formatoMoeda;
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = '/products?page=' + currentPage;
        if (searchTerm) {
          url = `/products/search?keyword=${searchTerm}`;
        }
        if (selectedCategory) {
          url = `/products/filter?category=${selectedCategory}`;
        }
        const response = await axios.get(url);
        setItems(response.data.data);
        setTotalPages(response.data.last_page);
        setPerPage(response.data.per_page);
        setLastPage(response.data.last_page);

        //extract unique categories]
        const uniqueCategories: string[] = Array.from(
          new Set(response.data.data.map((item: IData) => item.category))
        );

        setFilter(uniqueCategories);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [currentPage, searchTerm, selectedCategory]);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <S.Container>
      <S.Content>
        <S.Title>
          <span>
            Produtos{'>'}
            <small>Todos os produtos</small>
          </span>
        </S.Title>

        <S.Header>
          <div>
            <FieldSearch onSearch={handleSearch} />
            <Filter
              filter={filter}
              onChange={(value) => setSelectedCategory(value)}
            />
          </div>
          <S.NewItem
            onClick={() => {
              setOpenModalCreate(true);
            }}
          >
            <CiCirclePlus />
            <span>Novo</span>
          </S.NewItem>
        </S.Header>

        <S.BodyTable>
          <thead>
            <tr>
              <th>Referência</th>
              <th>Categoria</th>
              <th>QTD</th>
              <th>Produto</th>
              <th>Valor R$</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {items?.map((item) => (
              <tr key={item.id}>
                <td>{item.reference}</td>
                <td>{item.category}</td>
                <td>{item.quantity}</td>
                <td>{item.name_product}</td>
                <td>{currencyFormat(parseFloat(item.price))}</td>
                <td>
                  <span>
                    <button>
                      <PiClipboardTextThin
                        onClick={() => {
                          setSelectedItemId(item.id);
                          setOpenModalDetails(true);
                        }}
                      />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedItemId(item.id);
                        setOpenModalEdite(true);
                      }}
                    >
                      <CiEdit />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedItemId(item.id);
                        setOpenModal(true);
                      }}
                    >
                      <CiTrash />
                    </button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

          <Modal
            isOpen={openModal}
            setModalOpen={() => {
              setSelectedItemId(null);
              setOpenModal(false);
            }}
            itemId={selectedItemId}
          />
          <ModalDetails
            isOpen={openModalDetails}
            setModalOpen={() => {
              setOpenModalDetails(false);
              setSelectedItemId(null);
            }}
            itemId={selectedItemId}
          />
          <ModalEdit
            isOpen={openModalEdite}
            setModalOpen={() => {
              setOpenModalEdite(false);
              setSelectedItemId(null);
            }}
            itemId={selectedItemId}
          />
        </S.BodyTable>
      </S.Content>

      <ModalCreate
        isOpen={openModalCreate}
        setModalOpen={() => setOpenModalCreate(false)}
      />

      <S.Footer>
        <Pagination
          currentPage={currentPage}
          lastPage={lastPage}
          perPage={perPage}
          prevPage={goToPrevPage}
          nextPage={goToNextPage}
        />
      </S.Footer>
    </S.Container>
  );
}
