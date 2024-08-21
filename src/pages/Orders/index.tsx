import * as S from './styles';
import Modal from '../../components/ModalDelete';
import NewItem from '../../components/NewItem';
import Pagination from '../../components/Pagination';
import { PiClipboardTextThin } from 'react-icons/pi';
import { CiCirclePlus, CiTrash, CiEdit } from 'react-icons/ci';
import { useEffect, useState } from 'react';
import axios_product from '../../api/axios';
import Loading from '../../components/Loading';
import ModalDetails from '../../components/ModalOrder/Details';

import { NumericFormat } from 'react-number-format';
import { parseISO, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface IData {
  id: number,
  created_at: string,
  customer: Customer,
  user: User,
  products: Produto[],
  discount: string,
  total_price: string;
}

interface Customer {
  id: number;
  name: string;
}

interface User {
  id: number;
  first_name: string;
}

interface Produto {
  id: number;
  quantity: number;
  price: string;
  length: number;
}

function formatarData(dataFormat: string) {
  if (dataFormat !== null) {
    const parsedDate = parseISO(dataFormat);
    return format(parsedDate, 'dd/MM/yyyy', { locale: ptBR });
  }
}

function calcularTotalVenda(val: any) {
  const totalProdutos = val.products.reduce((total: any, produto: any) => {
    // return total + produto.quantity * parseFloat(produto.price);
    return total + parseFloat(produto.price);
  }, 0);

  const desconto = parseFloat(val.discount);

  const totalVenda = totalProdutos - desconto;

  // return totalVenda.toFixed(2); // Formata o total com duas casas decimais
  return totalVenda; // Formata o total com duas casas decimais
}


export default function Orders() {
  const [openModal, setOpenModal] = useState(false);
  const [openModalDetails, setOpenModalDetails] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [items, setItems] = useState<IData[] | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  //Paginas
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState();
  const [lastPage, setLastPage] = useState();

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoadingModal(true);
      try {
        let url = 'order?page=' + currentPage;

        const response = await axios_product.get(`v1/${url}`);
        if (response.data.data.length > 0) {
          setItems(response.data.data);
          setTotalPages(response.data.last_page);
          setPerPage(response.data.per_page);
          setLastPage(response.data.last_page);
        }

      } catch (e) {
        console.error(e);
      } finally {
        setLoadingModal(false);
      }
    };
    fetchData();
  }, [currentPage]);

  return (
    <S.Container>
      {loadingModal && (<Loading />)}
      <S.Content>
        <S.Title>
          <span>
            Venda{'>'}
            <small>Todos as vendas</small>
          </span>
          <S.Header>
            <NewItem
              url="/Orders/Create"
              icon={<CiCirclePlus fontSize={24} />}
              title="Novo"
            />
          </S.Header>
        </S.Title>
        <S.BodyTable>
          <tr>
            <th>#</th>
            <th>Resumo</th>
            <th>Cliente</th>
            <th>Data</th>
            <th>Vendedor</th>
            <th>Ações</th>
          </tr>
          {
            items?.map((val, index) => {
              const totalVenda = calcularTotalVenda(val);
              console.log(val);
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    <NumericFormat
                      displayType={'text'}
                      thousandSeparator="."
                      decimalSeparator=","
                      decimalScale={2}
                      value={val.total_price || "-"}
                      fixedDecimalScale={true}
                      prefix='R$'
                    />
                  </td>
                  <td>{val.customer?.name || "-"}</td>
                  <td>{formatarData(val.created_at)}</td>
                  <td>{val.user.first_name}</td>
                  <td>
                    <div>
                      <button onClick={() => {
                        setSelectedItemId(val.id);
                        setOpenModalDetails(true);
                      }}>
                        <PiClipboardTextThin />
                      </button>
                      <button
                        onClick={() => {
                          setOpenModal(true);
                          setSelectedItemId(val.id);
                        }}>
                        <CiTrash />
                      </button>
                    </div>
                  </td>
                </tr>

              )
            })
          }
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
      <Modal
        itemId={selectedItemId}
        isOpen={openModal}
        setModalOpen={() => setOpenModal(false)}
        url='order'
      />
      <ModalDetails
        itemId={selectedItemId}
        isOpen={openModalDetails}
        setModalOpen={() => setOpenModalDetails(false)}
      />
    </S.Container>
  );
}
