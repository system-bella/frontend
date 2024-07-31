import * as S from './styles';

// import FieldSearch from '../../components/FieldSearch';
//import Filter from '../../components/Filter';
import Modal from '../../components/ModalDelete';
import NewItem from '../../components/NewItem';
//import Pagination from '../../components/Pagination';
import ModalDetails from '../../components/ModalDetails';

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
            Cliente{'>'}
            <small>Todos os Clientes</small>
          </span>
        </S.Title>
        <S.Header>
          <div>
            {/* <FieldSearch /> */}
            {/* <Filter /> */}
          </div>
          <NewItem
            url="/Client/Create"
            icon={<CiCirclePlus fontSize={24} />}
            title="Novo"
          />
        </S.Header>
        <S.BodyTable>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>RG</th>
            <th>CPF</th>
            <th>Data Nascimento</th>
            <th>Ações</th>
          </tr>
          <tr>
            <td>1</td>
            <td>Fabine Luiza</td>
            <td>5588967-2</td>
            <td>666.555.777-88</td>
            <td>27/07/2001</td>
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
            isOpen={openModal}
            itemId={1}
            setModalOpen={() => {
              setOpenModal(false);
            }}
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
          nextPage={() => console.log(1)}
          prevPage={() => console.log(1)}
        /> */}
      </S.Footer>
    </S.Container>
  );
}
