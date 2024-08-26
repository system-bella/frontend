import * as S from './styles';
import axios_product from '../../api/axios';
import FieldSearch from '../../components/FieldSearch';
import ModalDell from '../../components/ModalDelete';
import Pagination from '../../components/Pagination';
import { CiCirclePlus, CiTrash, CiEdit } from 'react-icons/ci';
import { useEffect, useState } from 'react';
//Modal
import CreateCustomer from '../../components/ModalCustomer/Create';
import EditCustomer from '../../components/ModalCustomer/Update';
import Loading from '../../components/Loading';
import Sleep from '../../components/Error/SleepSytem';
import axios from 'axios';

interface IData {
  id: number;
  name: string;
  cpf: string;
  contact: string;
}

const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};

export default function Customer() {
  const [items, setItems] = useState<IData[] | null>(null);
  const [openModalDell, setOpenModalDell] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalEdite, setOpenModalEdite] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [openSleep, setOpenSleep] = useState(false);

  //Paginas
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState();
  const [lastPage, setLastPage] = useState();

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoadingModal(true);
      try {
        let url = 'customer?page=' + currentPage;
        if (searchTerm) {
          url = `customer?search=${searchTerm}`;
        }
        const response = await axios_product.get(`v1/${url}`);
        setItems(response.data.data);
        setTotalPages(response.data.last_page);
        setPerPage(response.data.per_page);
        setLastPage(response.data.last_page);

      } catch (e) {
        console.log(e);
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

  if (openSleep) {
    return <Sleep />
  }

  return (
    <S.Container>
      {loadingModal && (<Loading />)}
      <S.Content>
        <S.Title>
          <span>
            Cliente{'>'}
            <small>Todos os Clientes</small>
          </span>
          <S.Header>
            <div>
              <FieldSearch onSearch={handleSearchChange} />
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
        </S.Title>
        <S.BodyTable>
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>CPF</th>
              <th>Contato</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {
              items?.map((val, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{truncateText(val.name, 15)}</td>
                    <td>{val.cpf}</td>
                    <td>{val.contact || "-"}</td>
                    <td>
                      <span>
                        <button
                          onClick={() => {
                            setSelectedItemId(val.id);
                            setOpenModalEdite(true);
                          }}
                        >
                          <CiEdit />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedItemId(val.id);
                            setOpenModalDell(true);
                          }}
                        >
                          <CiTrash />
                        </button>
                      </span>
                    </td>
                  </tr>

                )
              })
            }

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

      {/* Modal */}

      <CreateCustomer
        isOpen={openModalCreate}
        setModalOpen={() => setOpenModalCreate(false)} />

      <EditCustomer
        isOpen={openModalEdite}
        setModalOpen={() => {
          setOpenModalEdite(false);
        }}
        itemId={selectedItemId} />

      <ModalDell
        url='customer'
        isOpen={openModalDell}
        itemId={selectedItemId}
        setModalOpen={() => {
          setOpenModalDell(false);
        }} />
    </S.Container>
  );
}
