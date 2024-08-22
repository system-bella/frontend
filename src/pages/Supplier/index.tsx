import * as S from './styles';
import axios_product from '../../api/axios';
import FieldSearch from '../../components/FieldSearch';
import ModalDell from '../../components/ModalDelete';
import Pagination from '../../components/Pagination';
import { CiCirclePlus, CiTrash, CiEdit } from 'react-icons/ci';
import { PiClipboardTextThin } from 'react-icons/pi';
import { useEffect, useState } from 'react';
//Modal
import CreateFornecedor from "../../components/ModalFonecedor/Create";
import UpdateFornecedor from '../../components/ModalFonecedor/Update';
import DetailsFornecedor from '../../components/ModalFonecedor/Details';
import Loading from '../../components/Loading';
import Sleep from '../../components/Error/SleepSytem';
import axios from 'axios';

interface IData {
  id: number;
  name: string;
  contact: string;
  email: string;
}

export default function Supplier() {
  const [items, setItems] = useState<IData[] | null>(null);
  const [openModalDell, setOpenModalDell] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [openModalForn, setOpenModalForn] = useState(false);
  const [openModalEdite, setOpenModalEdite] = useState(false);
  const [openModalDetails, setOpenModalDetails] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [openSleep, setOpenSleep] = useState(false);

  //Paginas
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState();
  const [lastPage, setLastPage] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setLoadingModal(true);
      try {
        let url = 'supplier?page=' + currentPage;
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
  }, [currentPage]);

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
            Fornecedor{'>'}
            <small>Todos os Fornecedores</small>
          </span>
          <S.Header>
            <S.NewItem
              onClick={() => {
                setOpenModalForn(true);
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
              <th>Contato</th>
              <th>E-mail</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {
              items?.map((val, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{val.name}</td>
                    <td>{val.contact || "-"}</td>
                    <td>{val.email || "-"}</td>
                    <td>
                      <span>
                        <button>
                          <PiClipboardTextThin
                            onClick={() => {
                              setSelectedItemId(val.id);
                              setOpenModalDetails(true);
                            }}
                          />
                        </button>
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

      <CreateFornecedor
        isOpen={openModalForn}
        setModalOpen={() => setOpenModalForn(false)} />

      <DetailsFornecedor
        isOpen={openModalDetails}
        setModalOpen={() => {
          setOpenModalDetails(false);
          setSelectedItemId(null);
        }}
        itemId={selectedItemId}
      />

      <UpdateFornecedor
        isOpen={openModalEdite}
        setModalOpen={() => {
          setOpenModalEdite(false);
        }}
        itemId={selectedItemId} />

      <ModalDell
        url='supplier'
        isOpen={openModalDell}
        itemId={selectedItemId}
        setModalOpen={() => {
          setOpenModalDell(false);
        }} />
    </S.Container>
  );
}
