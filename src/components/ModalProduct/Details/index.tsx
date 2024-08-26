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

const formattedTotalVenda = (totalVenda: any) => new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
}).format(parseFloat(totalVenda));

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
                <S.InforSpan>Veja todos os detalhes sobre o produto</S.InforSpan>
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
                  <S.TituloH5>Nome</S.TituloH5>
                  <S.InforSpan>{item.name}</S.InforSpan>
                </div>
                <div>
                  <S.TituloH5>Referência</S.TituloH5>
                  <S.InforSpan>{item.barcode}</S.InforSpan>
                </div>
              </S.Info>
              <S.Info>
              <div>
                  <S.TituloH5>Preço de Compra</S.TituloH5>
                  <S.InforSpan>{formattedTotalVenda(item.purchase_value) || '-'}</S.InforSpan>
                </div>
                <div>
                  <S.TituloH5>Preço Final R$</S.TituloH5>
                  <S.InforSpan>{formattedTotalVenda(item.price)}</S.InforSpan>
                </div>
              </S.Info>
              <S.Info>
                <div>
                  <S.TituloH5>Fornecedor</S.TituloH5>
                  <S.InforSpan>{item.supplier.name}</S.InforSpan>
                </div>
                <div>
                  <S.TituloH5>Quantidade</S.TituloH5>
                  <S.InforSpan>{item.quantity}</S.InforSpan>
                </div>
              </S.Info>
              

              <S.InfoDescription>
                <div>
                  <S.TituloH5>Descrição</S.TituloH5>
                  <S.InforSpan>{item.description || "Dado não cadastrado!"}</S.InforSpan>
                </div>
                <div>
                  <S.TituloH5>Categoria</S.TituloH5>
                  <S.InforSpan>{item.category.category}</S.InforSpan>
                </div>
              </S.InfoDescription>

              <S.InfoQr>
                <div>
                  <S.TituloH5>Código QR</S.TituloH5>
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
