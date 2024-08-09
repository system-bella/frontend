//import FieldSearch from '../FieldSearch';
import * as S from './styles';
import { BsArrowReturnLeft } from 'react-icons/bs';
import ButtonAutolineCancel from '../../ButtonAutolineCancel';
import ButtonSave from '../../ButtonSave';
import { CiTrash } from 'react-icons/ci';
import { CiSearch } from 'react-icons/ci';

export default function CreateOrders() {
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
        <S.Fildset>
          <S.FormPagamento>
            <label>Forma de Pagamento</label>
            <S.Filter id="selection" name="Filtro">
              <option value="Filtos">Dinheiro</option>
              <option value="opcao2">Pix</option>
              <option value="opcao3">Cartão de Crédito</option>
              <option value="opcao4">Cartão de Débito</option>
              <option value="opcao5">Boleto</option>
            </S.Filter>
            <label>Parcelas</label>
            <S.Filter id="selection" name="Filtro">
              <option value="Filtos">1X 200,50</option>
              <option value="opcao2">Parcela 2</option>
              <option value="opcao3">Parcela 3</option>
              <option value="opcao4">Parcela 4</option>
              <option value="opcao5">Parcela 5</option>
            </S.Filter>
            <label>Cliente</label>
            <S.Filter id="selection" name="Filtro">
              <option value="Filtos">Selecione</option>
              <option value="opcao2">Cliente 2</option>
              <option value="opcao3">Cliente 3</option>
              <option value="opcao4">Cliente 4</option>
              <option value="opcao5">Cliente 5</option>
            </S.Filter>
          </S.FormPagamento>
          <S.ListProduct>
            <S.TableProduct>
              <thead>
                <tr>
                  <th>N° ITEM</th>
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
                    <CiTrash />
                  </td>
                </tr><tr>
                  <td>1</td>
                  <td>7878465957863</td>
                  <td>Bolsa</td>
                  <td>1,000</td>
                  <td>298,98</td>
                  <td>298,98</td>
                  <td>
                    <CiTrash />
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
                    <CiTrash />
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
                    <CiTrash />
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
                    <CiTrash />
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
                    <CiTrash />
                  </td>
                </tr>
              </tbody>
            </S.TableProduct>
          </S.ListProduct>
        </S.Fildset>

        <S.Fildset>
          <S.FormTotal>
            <div>
              <label>SUBTOTAL</label>
              <S.ValoresT>R$ 0,00</S.ValoresT>
            </div>

            <S.DivLateral>
              <S.InputLeft>
                <label>DESCONTO</label>
                <S.InputDesconto id="selection" name="Filtro">
                  <option value="Filtos">0%</option>
                  <option value="opcao2">Desconto 2</option>
                  <option value="opcao3">Desconto 3</option>
                  <option value="opcao4">Desconto 4</option>
                  <option value="opcao5">Desconto 5</option>
                </S.InputDesconto>
              </S.InputLeft>

              <S.InputRight>
                <label>TOTAL</label>
                <S.ValoresT>R$ 0,00</S.ValoresT>
              </S.InputRight>
            </S.DivLateral>
          </S.FormTotal>
        </S.Fildset>

      </S.Content>
      <S.Footer>
        <ButtonAutolineCancel label="Cancelar Venda" />
        <ButtonSave label="Finalizar Venda" />
      </S.Footer>
    </S.Container>
  );
}
