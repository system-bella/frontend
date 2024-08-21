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
                <span>Veja todos os detalhes sobre a venda</span>
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
                  <h5>Data da Compra</h5>
                  <span>{formatarData(item.created_at) || '-'}</span>
                </div>
                <div>
                  <h5>Resumo</h5>
                  <span>{item.total_price}</span>
                </div>
              </S.Info>
              <S.Info>
                <div>
                  <h5>Pagamento</h5>
                  <span>{item.payment}</span>
                </div>
                <div>
                  <h5>Desconto (R$)</h5>
                  <span>{item.discount}</span>
                </div>
              </S.Info>
              <S.Info>
                <div>
                  <h5>Cliente</h5>
                  <span>{item.customer?.name || '-'}</span>
                </div>
                <div>
                  <h5>Vendedor</h5>
                  <span>{item.user.first_name}</span>
                </div>
              </S.Info>


              <S.InfoDescription>
                <div>
                  <h5>Produtos</h5>
                  <span>{item.products.map(val => {
                    return (
                      <p>
                        {val.name}
                      </p>
                    )
                  })}</span>
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
