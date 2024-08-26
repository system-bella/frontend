import { useState } from 'react';
import { AxiosError } from 'axios';
import axios_product from '../../api/axios';
// styles
import * as S from './style';
// icons
import { CiCircleAlert } from 'react-icons/ci';

interface IModalProps {
  isOpen: boolean;
  setModalOpen: any;
}

export default function Logout({
  isOpen,
  setModalOpen,

}: IModalProps) {

  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios_product.post('v1/logout'); // Chama a API de logout
      // Limpar o estado do usuário, tokens, etc.
      window.location.href = "/"; // Redireciona para a página de login
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      setLoading(false);
    }
  };
  if (isOpen) {
    return (
      <S.Container>
        <S.ContentModel>
          <S.InfoModel>
            <CiCircleAlert />
            <div>
              <span>Tem certeza que deseja sair?</span>
              <small>Na próxima vez você deverá realizar seu login</small>
            </div>
          </S.InfoModel>
          <S.Action>
            <S.Cancel onClick={setModalOpen}>Cancelar</S.Cancel>
            <S.Confirm disabled={loading} onClick={handleLogout}>
              {loading ? 'Saindo...' : 'Confirmar'}
            </S.Confirm>
          </S.Action>
        </S.ContentModel>
      </S.Container>
    );
  }
  return null;
}
