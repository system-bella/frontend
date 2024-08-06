import * as S from './styles';

import FieldSearch from '../../components/FieldSearch';
import Modal from '../../components/ModalDelete';
import NewItem from '../../components/NewItem';
import Pagination from '../../components/Pagination';
import Details from '../../components/ModalCustomer/Details';

import { PiClipboardTextThin } from 'react-icons/pi';
import { CiCirclePlus, CiTrash, CiEdit } from 'react-icons/ci';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Orders() {
  const [openModal, setOpenModal] = useState(false);
  const [openModalDetails, setOpenModalDetails] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // let url = '/product?page=' + currentPage;
        let url = '/product';
        // if (searchTerm) {
        //   url = `/product/search?keyword=${searchTerm}`;
        // }
        // if (selectedCategory) {
        //   url = `/product/filter?category=${selectedCategory}`;
        // }
        const response = await axios.get('http://127.0.0.1:8000/api/product');
        // setItems(response.data.data);
        // setTotalPages(response.data.last_page);
        // setPerPage(response.data.per_page);
        // setLastPage(response.data.last_page);

      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  return (
    <S.Container>
      <S.Content>
        <S.Title>
          <span>
            Cliente{'>'}
            <small>Todos os Clientes</small>
          </span>
          <S.Header>
            <div>
              <FieldSearch onSearch={() => console.log('ola')} />
            </div>
            <NewItem
              url="/Client/Create"
              icon={<CiCirclePlus fontSize={24} />}
              title="Novo"
            />
          </S.Header>
        </S.Title>
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
            <td>Sayury Luiza</td>
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
                  <a href="/Client/Update">
                    <CiEdit />
                  </a>
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
            url='customer'
          />
          <Details
            // itemId={1}
            isOpen={openModalDetails}
            setModalOpen={() => setOpenModalDetails(false)}
          />
        </S.BodyTable>
      </S.Content>

      <S.Footer>
        <Pagination
          currentPage={1}
          lastPage={undefined}
          perPage={undefined}
          prevPage={() => console.log('ola')}
          nextPage={() => console.log('ola')}
        />
      </S.Footer>
    </S.Container>
  );
}
