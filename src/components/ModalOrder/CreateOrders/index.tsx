//import FieldSearch from '../FieldSearch';
import * as S from './styles';
import { BsArrowReturnLeft } from 'react-icons/bs';
import ButtonAutolineCancel from '../../ButtonAutolineCancel';
import ButtonSave from '../../ButtonSave';
import { CiTrash } from 'react-icons/ci';
import { CiSearch } from 'react-icons/ci';
import axios_product from '../../../api/axios';
import { useEffect, useState } from 'react';

interface Customer {
  id: number;
  name: string;
}

export default function CreateOrders() {
  const [customer, setCustomer] = useState<Customer[] | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        let url = 'product';
        if (searchTerm) {
          url = `product?search=${searchTerm}`;
        }
        const [responseCustomer, productResponse] = await Promise.all([
          axios_product.get('v1/customer-find-all'),
          axios_product.get(`v1/${url}`)
        ]);

        setCustomer(responseCustomer.data);
        console.log(productResponse.data.data);

        // Preencher os outros campos

      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, []);

  return (
    <S.Container>
      <S.Content>
        <S.Title>
          <span>
            Vendas{'>'}
            <small>Cadastrar Vendas</small>
          </span>
        </S.Title>
        <S.Header>
          <div>
            <S.InputSmall type="number" placeholder="QTD: 1" min={1} />
            <S.DivInput>
              <button>
                <CiSearch />
              </button>
              <input type="text" placeholder="Nome ou código do produto" />
            </S.DivInput>
          </div>
          <S.Button onClick={() => console.log('test')}>
            <BsArrowReturnLeft />
            <span>Lançar</span>
          </S.Button>
        </S.Header>

        <S.ContainerBloc>
          <S.ContentLeft>
            <div>
              <label>Forma de Pagamento</label>
              <S.Filter id="selection" name="Filtro">
                <option value="Dinheiro">Dinheiro</option>
                <option value="Pix">Pix</option>
                <option value="Credito">Cartão de Crédito</option>
                <option value="Debito">Cartão de Débito</option>
                <option value="Boleto">Boleto</option>
              </S.Filter>
            </div>

            <div>
              <label>Cliente</label>
              <S.Filter id="selection" name="Filtro">
                <option value="" disabled selected hidden>
                  Selecione
                </option>
                {
                  customer?.map((val) => {
                    return (
                      <option key={val.id} value={val.id}>
                        {val.name}
                      </option>
                    )
                  })
                }
              </S.Filter>
            </div>

            <div>
              <label>DESCONTO</label>
              <S.Filter id="selection" name="Filtro">
                <option value="Filtos">0%</option>
                <option value="opcao2">Desconto 2</option>
                <option value="opcao3">Desconto 3</option>
                <option value="opcao4">Desconto 4</option>
                <option value="opcao5">Desconto 5</option>
              </S.Filter>
            </div>
          </S.ContentLeft>

          <S.ContentRight>
            <S.ListProduct>
              <S.TableProduct>
                <thead>
                  <tr>
                    <th>N°</th>
                    <th>CÓD.</th>
                    <th>DESCRIÇÃO</th>
                    <th>QTD</th>
                    <th>Vlr. UNITÁRIO</th>
                    <th>TOTAL</th>
                    <th>REMOVER</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>7878465957863</td>
                    <td>Bolsa</td>
                    <td>1,000</td>
                    <td>298,98</td>
                    <td>298,98</td>
                    <td>
                      <button>
                        <CiTrash />
                      </button>
                    </td>
                  </tr><tr>
                    <td>1</td>
                    <td>7878465957863</td>
                    <td>Bolsa</td>
                    <td>1,000</td>
                    <td>298,98</td>
                    <td>298,98</td>
                    <td>
                      <button>
                        <CiTrash />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>7878465957863</td>
                    <td>Bolsa</td>
                    <td>1,000</td>
                    <td>298,98</td>
                    <td>298,98</td>
                    <td>
                      <button>
                        <CiTrash />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>7878465957863</td>
                    <td>Bolsa</td>
                    <td>1,000</td>
                    <td>298,98</td>
                    <td>298,98</td>
                    <td>
                      <button>
                        <CiTrash />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>7878465957863</td>
                    <td>Bolsa</td>
                    <td>1,000</td>
                    <td>298,98</td>
                    <td>298,98</td>
                    <td>
                      <button>
                        <CiTrash />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </S.TableProduct>
            </S.ListProduct>

            <S.FormTotal>
              <div>
                <label>SUBTOTAL</label>
                <S.ValoresT>R$ 0,00</S.ValoresT>
                <label>TOTAL</label>
                <S.ValoresT>R$ 0,00</S.ValoresT>
              </div>
            </S.FormTotal>
          </S.ContentRight>
        </S.ContainerBloc>

      </S.Content>
      <S.Footer>
        <ButtonAutolineCancel label="Cancelar Venda" />
        <ButtonSave label="Finalizar Venda" />
      </S.Footer>
    </S.Container>
  );
}
