import { useEffect, useState } from 'react';
import axios_production from '../../../api/axios_production';
import axios from 'axios';

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
  name: string;
  quantity: number;
  category: Categoria;
  price: string;
  description: string;
  barcode: string;
}

interface Categoria {
  id: number,
  category: string,
}

export default function ModalDetails({
  isOpen,
  setModalOpen,
  itemId
}: IModalDetailsProps) {
  const [item, setItem] = useState<IData | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/product/${itemId}`);
        console.log(response);
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
                <span>Veja todos os detalhes sobre o produto</span>
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
                <div>
                  <h5>Quantidade</h5>
                  <span>{item.quantity}</span>
                </div>
              </S.Info>
              <S.Info>
                <div>
                  <h5>Preço R$</h5>
                  <span>{item.price}</span>
                </div>
                <div>
                  <h5>Categoria</h5>
                  <span>{item.category.category}</span>
                </div>
              </S.Info>

              <S.InfoDescription>
                <div>
                  <h5>Descrição</h5>
                  <span>{item.description || "Dado não cadastrado!"}</span>
                </div>
              </S.InfoDescription>

              <S.InfoQr>
                <div>
                  <h5>Código QR</h5>
                  <QRCode
                    category={item.category.category}
                    name={item.name}
                    price={item.price}
                  />
                </div>
              </S.InfoQr>
            </S.DivideInfo>
          </S.MainInformation>
        </S.Content>
      </S.Container>
    );
  }
  return null;
}
