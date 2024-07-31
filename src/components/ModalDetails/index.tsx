import { useEffect, useState } from 'react';
import axios from '../../api/axios';

import * as S from './styles';
import { PiClipboardTextThin } from 'react-icons/pi';
import { CiCircleRemove } from 'react-icons/ci';
import QRCode from '../QRCode';
//import Barcode from 'react-barcode'; remove library after

interface IModalDetailsProps {
  isOpen: boolean;
  setModalOpen: any;
  itemId: number | null;
}

interface IData {
  reference: number;
  barcode: number;
  category: string;
  quantity: number;
  name_product: string;
  description: string;
  price: string;
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
        const response = await axios.get(`/products/${itemId}`);
        setItem(response.data); // Assuming your data is in the 'data' property of the response
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    if (itemId) {
      fetchProductDetails();
    }
  }, [itemId]);

  const ref = item?.reference?.toString() ?? '';

  if (isOpen) {
    return (
      <S.Container>
        <S.Content>
          <S.Header>
            <S.Title>
              <PiClipboardTextThin />
              <div>
                <h4>Detalhes {item?.name_product}</h4>
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
                  <span>{item?.name_product}</span>
                </div>
                <div>
                  <h5>Quantidade</h5>
                  <span>{item?.quantity}</span>
                </div>
              </S.Info>
              <S.Info>
                <div>
                  <h5>Preço R$</h5>
                  <span>{item?.price}</span>
                </div>
                <div>
                  <h5>Referência</h5>
                  <span>{item?.reference}</span>
                </div>
              </S.Info>

              <S.InfoDescription>
                <div>
                  <h5>Descrição</h5>
                  <span>{item?.description}</span>
                </div>
              </S.InfoDescription>

              <S.InfoQr>
                <div>
                  <h5>Código QR</h5>
                  <QRCode
                    category={item?.category}
                    name={item?.name_product}
                    price={item?.price}
                    reference={ref}
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
