import * as S from './styles';
import Modal from '../../components/ModalDelete';
import NewItem from '../../components/NewItem';
//import Pagination from '../../components/Pagination';
import ModalDetails from '../../components/ModalProduct/ModalDetails';
import FieldSearch from '../../components/FieldSearch';
import { PiClipboardTextThin } from 'react-icons/pi';
import { CiCirclePlus, CiTrash, CiEdit } from 'react-icons/ci';
import { useState } from 'react';

export default function Orders() {
  const [openModal, setOpenModal] = useState(false);
  const [openModalDetails, setOpenModalDetails] = useState(false);

  return (
    <S.Container>
      <S.Content>
        <S.Title>
          <span>
            Venda{'>'}
            <small>Todos as vendas</small>
          </span>
          <S.Header>
            <div>
              <FieldSearch onSearch={"ola"} />
            </div>
            <NewItem
              url="/Orders/Create"
              icon={<CiCirclePlus fontSize={24} />}
              title="Novo"
            />
          </S.Header>
        </S.Title>
        <S.BodyTable>
          <tr>
            <th>Resumo</th>
            <th>Data</th>
            <th>Produto</th>
            <th>QTD</th>
            <th>Cliente</th>
            <th>Ações</th>
          </tr>
          <tr>
            <td>900,00 R$</td>
            <td>12/12/2023</td>
            <td>Bolsa</td>
            <td>3</td>
            <td>Fabine Luiza</td>
            <td>
              <div>
                <button>
                  <PiClipboardTextThin
                    onClick={() => setOpenModalDetails(true)}
                  />
                </button>
                <button>
                  <CiEdit />
                </button>
                <button onClick={() => setOpenModal(true)}>
                  <CiTrash />
                </button>
              </div>
            </td>
          </tr>
          <Modal
            itemId={1}
            isOpen={openModal}
            setModalOpen={() => setOpenModal(false)}
            url='order'
          />
          <ModalDetails
            itemId={1}
            isOpen={openModalDetails}
            setModalOpen={() => setOpenModalDetails(false)}
          />
        </S.BodyTable>
      </S.Content>

      <S.Footer>
        {/* <Pagination
          perPage={'1'}
          nextPage={() => console.log(1)}
          prevPage={() => console.log(1)}
        /> */}
      </S.Footer>
    </S.Container>
  );
}
