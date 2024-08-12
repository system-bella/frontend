import { useState } from 'react';
import { AxiosError } from 'axios';
import axios_production from '../../api/axios_production';
import axios from 'axios';

// styles
import * as S from './styles';
// icons
import { CiCircleAlert } from 'react-icons/ci';

interface IModalProps {
  isOpen: boolean;
  setModalOpen: any;
  itemId: number | null;
  url: string;
}

export default function Modal({
  isOpen,
  setModalOpen,
  itemId,
  url
}: IModalProps) {
  console.log(itemId);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await axios_production.delete(`/${url}/${itemId}`);
      // const response = await axios.delete(`http://127.0.0.1:8000/api/product/${itemId}`);
      const statusCode = response.status;

      if (statusCode === 200) {
        setModalOpen(false);
        setLoading(false);
        window.location.reload();
      }
    } catch (error) {
      setLoading(false);
      if ((error as AxiosError).response) {
        const statusCode = (error as AxiosError).response?.status;

        if (statusCode === 404) {
          alert('Produto não encontrado');
        } else {
          alert(`Error with status code: ${statusCode}`);
        }
      } else {
        alert('Erro desconhecido');
      }
    }
  };
  if (isOpen) {
    return (
      <S.Container>
        <S.ContentModel>
          <S.InfoModel>
            <CiCircleAlert />
            <div>
              <span>Tem certeza que deseja excluir este item?</span>
              <small>Está ação não poderá ser desfeita</small>
            </div>
          </S.InfoModel>
          <S.Action>
            <S.Cancel onClick={setModalOpen}>Cancelar</S.Cancel>
            <S.Delete onClick={handleDelete} disabled={loading}>
              {loading ? 'Excluindo...' : 'Confirmar'}
            </S.Delete>
          </S.Action>
        </S.ContentModel>
      </S.Container>
    );
  }
  return null;
}
