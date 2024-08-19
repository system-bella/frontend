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
  name: string;
  quantity: number;
  category: Categoria;
  price: string;
  description: string;
  barcode: string;
  supplier: Fornecedor;
  purchase_value: number;
}

interface Categoria {
  id: number,
  category: string,
}

interface Fornecedor {
  id: number,
  name: string,
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
        const response = await axios_product.get(`v1/product/${itemId}`);
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
                  <h5>Referência</h5>
                  <span>{item.barcode}</span>
                </div>
              </S.Info>
              <S.Info>
              <div>
                  <h5>Preço de Compra</h5>
                  <span>{item.purchase_value || '-'}</span>
                </div>
                <div>
                  <h5>Preço Final R$</h5>
                  <span>{item.price}</span>
                </div>
              </S.Info>
              <S.Info>
                <div>
                  <h5>Fornecedor</h5>
                  <span>{item.supplier.name}</span>
                </div>
                <div>
                  <h5>Quantidade</h5>
                  <span>{item.quantity}</span>
                </div>
              </S.Info>
              

              <S.InfoDescription>
                <div>
                  <h5>Descrição</h5>
                  <span>{item.description || "Dado não cadastrado!"}</span>
                </div>
                <div>
                  <h5>Categoria</h5>
                  <span>{item.category.category}</span>
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
