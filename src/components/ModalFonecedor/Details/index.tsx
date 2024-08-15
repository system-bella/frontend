import { useEffect, useState } from 'react';
import axios_product from '../../../api/axios';

import * as S from './styles';
import { PiClipboardTextThin } from 'react-icons/pi';
import { CiCircleRemove } from 'react-icons/ci';
import QRCode from '../../QRCode';

interface IModalDetailsProps {
  isOpen: boolean;
  setModalOpen: any;
  itemId: number | null;
}

interface IData {
  id: number;
  name: string;
  contact: string;
  email: string;
  description: string;
}

export default function DetailsFornecedor({
  isOpen,
  setModalOpen,
  itemId
}: IModalDetailsProps) {
  const [item, setItem] = useState<IData | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios_product.get(`v1/supplier/${itemId}`);
        setItem(response.data); // Assuming your data is in the 'data' property of the response
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    if (itemId) {
      fetchProductDetails();
    }
  }, [itemId]);


  if (isOpen && item) {
    return (
      <S.Container>
        <S.Content>
          <S.Header>
            <S.Title>
              <PiClipboardTextThin />
              <div>
                <h4>Detalhes {item.name}</h4>
                <span>Veja todos os detalhes sobre o fornecedor</span>
              </div>
            </S.Title>
            <button onClick={setModalOpen}>
              <CiCircleRemove />
            </button>
          </S.Header>
          <S.MainInformation>
            <h4>Informações principais</h4>
            <S.DivideInfo>
              <S.Info>
                <div>
                  <h5>Nome</h5>
                  <span>{item.name}</span>
                </div>
              </S.Info>
              <S.Info>
                <div>
                  <h5>E-mail</h5>
                  <span>{item.email || "Dado não cadastrado!"}</span>
                </div>
                <div>
                  <h5>Contato</h5>
                  <span>{item.contact || "Dado não cadastrado!"}</span>
                </div>
              </S.Info>

              <S.InfoDescription>
                <div>
                  <h5>Descrição</h5>
                  <span>{item.description || "Dado não cadastrado!"}</span>
                </div>
              </S.InfoDescription>
            </S.DivideInfo>
          </S.MainInformation>
        </S.Content>
      </S.Container>
    );
  }
  return null;
}
