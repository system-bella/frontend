import { useState, useEffect } from 'react';
import ModalCreate from '../../components/ModalProduct/ModalCreate';
import axios_product from '../../api/axios';
// styles
import * as S from './styles';

// components
import FieldSearch from '../../components/FieldSearch';
import ModalDel from '../../components/ModalDelete';
//import NewItem from '../../components/NewItem';
import Pagination from '../../components/Pagination';
import ModalDetails from '../../components/ModalProduct/ModalDetails';
import ModalEdit from '../../components/ModalProduct/ModalEdite';
import ModalOption from '../../components/ModalOption';


// icons
import { CiCirclePlus, CiTrash, CiEdit } from 'react-icons/ci';
import { PiClipboardTextThin } from 'react-icons/pi';

interface IData {
  id: number;
  name: string;
  quantity: number;
  category_id: number;
  category: Categoria;
  price: string;
  barcode: string;
}

interface Categoria {
  id: number,
  category: string,
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
  const [openModalDell, setOpenModalDell] = useState(false);
  const [openModalOpt, setOpenModalOpt] = useState(false);

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = 'product?page=' + currentPage;
        if (searchTerm) {
          url = `product?search=${searchTerm}`;
        }
        const response = await axios_product.get(`v1/${url}`);
        setItems(response.data.data);
        setTotalPages(response.data.last_page);
        setPerPage(response.data.per_page);
        setLastPage(response.data.last_page);

        //extract unique categories]
        const uniqueCategories: string[] = Array.from(
          new Set(response.data.data.map((item: IData) => item.category_id))
        );

        setFilter(uniqueCategories);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [currentPage, searchTerm]);

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

          <S.Header>
            <div>
              <FieldSearch onSearch={handleSearchChange} />
            </div>

            <S.ContentModal>
              <S.NewItem
                onClick={() => {
                  setOpenModalOpt(true);
                  // setOpenModalCreate(true);
                }}
              >
                <CiCirclePlus />
                <span>Novo</span>
              </S.NewItem>

            </S.ContentModal>
          </S.Header>
          <S.ModalOpt>
            <ModalOption
              isOpen={openModalOpt}
              setModalOpen={() => setOpenModalOpt(false)} />
          </S.ModalOpt>
        </S.Title>

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
                <td>{item.barcode}</td>
                <td>{item.category.category}</td>
                <td>{item.quantity}</td>
                <td>{item.name}</td>
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
                        setOpenModalDell(true);
                      }}
                    >
                      <CiTrash />
                    </button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </S.BodyTable>
      </S.Content>
      <S.Footer>
        <Pagination
          currentPage={currentPage}
          lastPage={lastPage}
          perPage={perPage}
          prevPage={goToPrevPage}
          nextPage={goToNextPage}
        />
      </S.Footer>

      {/* Modals */}

      <ModalDel
        url='product'
        isOpen={openModalDell}
        setModalOpen={() => {
          setSelectedItemId(null);
          setOpenModalDell(false);
        }}
        itemId={selectedItemId}
      />

      <ModalCreate
        isOpen={openModalCreate}
        setModalOpen={() => setOpenModalCreate(false)}
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

    </S.Container>
  );
}
