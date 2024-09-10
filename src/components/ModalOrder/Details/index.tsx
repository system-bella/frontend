import { useEffect, useState } from 'react';
import axios_product from '../../../api/axios';
import Loading from '../../../components/Loading';

import * as S from './styles';
import { PiClipboardTextThin } from 'react-icons/pi';
import { CiCircleRemove } from 'react-icons/ci';
import { parseISO, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface IModalDetailsProps {
  isOpen: boolean;
  setModalOpen: any;
  itemId: number | null;
}

interface IData {
  id: number,
  created_at: string,
  customer: Customer,
  user: User,
  products: Produto[],
  discount: string,
  total_price: string;
  payment: string;
  number_payments: number;
}

interface Customer {
  id: number;
  name: string;
}

interface User {
  id: number;
  first_name: string;
}

interface Produto {
  id: number;
  quantity: number;
  price: string;
  name: string;
}

function formatarData(dataFormat: string) {
  if (dataFormat !== null) {
    const parsedDate = parseISO(dataFormat);
    return format(parsedDate, 'dd/MM/yyyy', { locale: ptBR });
  }
}
export default function ModalDetails({
  isOpen,
  setModalOpen,
  itemId
}: IModalDetailsProps) {

  const [item, setItem] = useState<IData | null>(null);
  const [loadingModal, setLoadingModal] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoadingModal(true);
      try {
        const response = await axios_product.get(`v1/order/${itemId}`);
        console.log(response);
        setItem(response.data); // Assuming your data is in the 'data' property of the response
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoadingModal(false);
      }
    };

    if (itemId) {
      fetchProductDetails();
    }
  }, [itemId]);

  if (isOpen && item) {
    return (
      <S.Container>
      {loadingModal && (<Loading />)}
        <S.Content>
          <S.Header>
            <S.Title>
              <PiClipboardTextThin />
              <div>
                <h4>Detalhes</h4>
                <S.InforSpan>Veja todos os detalhes sobre a venda</S.InforSpan>
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
                  <S.TituloH5>Data da Compra</S.TituloH5>
                  <S.InforSpan>{formatarData(item.created_at) || '-'}</S.InforSpan>
                </div>
                <div>
                  <S.TituloH5>Resumo</S.TituloH5>
                  <S.InforSpan>{item.total_price}</S.InforSpan>
                </div>
              </S.Info>
              <S.Info>
                <div>
                  <S.TituloH5>Pagamento</S.TituloH5>
                  <S.InforSpan>{item.payment}</S.InforSpan>
                </div>
                <div>
                  <S.TituloH5>Desconto (R$)</S.TituloH5>
                  <S.InforSpan>{item.discount}</S.InforSpan>
                </div>
              </S.Info>
              <S.Info>
                <div>
                  <S.TituloH5>Cliente</S.TituloH5>
                  <S.InforSpan>{item.customer?.name || '-'}</S.InforSpan>
                </div>
                <div>
                  <S.TituloH5>Vendedor</S.TituloH5>
                  <S.InforSpan>{item.user.first_name}</S.InforSpan>
                </div>
              </S.Info>


              <S.InfoDescription>
                <div>
                  <S.TituloH5>Produtos</S.TituloH5>
                  <S.InforSpan>{item.products.map(val => {
                    return (
                      <p>
                        {`${val.name} - ${val.quantity} qtd.`}
                      </p>
                    )
                  })}</S.InforSpan>
                </div>
                <div>
                  <S.TituloH5>Quantidade de Parcelas</S.TituloH5>
                  <S.InforSpan>
                    {item.number_payments || 'Sem parcelas'}
                  </S.InforSpan>
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
