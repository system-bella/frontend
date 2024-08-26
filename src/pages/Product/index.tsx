import { useState, useEffect } from 'react';
import axios_product from '../../api/axios';
// styles
import * as S from './styles';
import axios from 'axios';
// components
import FieldSearch from '../../components/FieldSearch';
import ModalDel from '../../components/ModalDelete';
import Pagination from '../../components/Pagination';
import ModalDetails from '../../components/ModalProduct/Details';
import ModalEdit from '../../components/ModalProduct/Update';
import ModalOption from '../../components/ModalOption';
import Loading from '../../components/Loading';
import Sleep from '../../components/Error/SleepSytem';
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

const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};

export default function Product() {
  const [items, setItems] = useState<IData[] | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingModal, setLoadingModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState();
  const [lastPage, setLastPage] = useState();

  const [openModalDetails, setOpenModalDetails] = useState(false);
  const [openModalEdite, setOpenModalEdite] = useState(false);
  const [openModalDell, setOpenModalDell] = useState(false);
  const [openModalOpt, setOpenModalOpt] = useState(false);
  const [openSleep, setOpenSleep] = useState(false);

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

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoadingModal(true);
      try {
        let url = 'product?page=' + currentPage;
        if (searchTerm) {
          url = `product?search=${searchTerm}`;
        }
        const response = await axios_product.get(`v1/${url}`);
        console.log(response.data.data);
        setItems(response.data.data);
        setTotalPages(response.data.last_page);
        setPerPage(response.data.per_page);
        setLastPage(response.data.last_page);

      } catch (e) {
        if (axios.isAxiosError(e)) {
          const status = e.response?.status;
          if (status === 401) {
            setOpenSleep(true);
          }
        }
      } finally {
        setLoadingModal(false);
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
  
  if(openSleep){
    return <Sleep />
  }

  return (
    <S.Container>
      {loadingModal && (<Loading />)}
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
              <th>Produto</th>
              <th>QTD</th>
              <th>Valor R$</th>
              <th>Categoria</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {items?.map((item) => (
              <tr key={item.id}>
                <td>{item.barcode}</td>
                <td>{truncateText(item.name, 10)}</td>
                <td>{item.quantity}</td>
                <td>{currencyFormat(parseFloat(item.price))}</td>
                <td>{item.category.category}</td>
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
