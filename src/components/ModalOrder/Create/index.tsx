import * as S from './styles';
import { BsArrowReturnLeft } from 'react-icons/bs';
import ButtonAutolineCancel from '../../ButtonAutolineCancel';
import { NumericFormat } from 'react-number-format';
import { CiTrash } from 'react-icons/ci';
import { CiSearch } from 'react-icons/ci';
import axios_product from '../../../api/axios';
import { useEffect, useState } from 'react';
import { useUser } from '../../../api/contextApi/userContext';
import ModalConfirm from '../../ModalConfirm'
import * as Yup from 'yup';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios, { AxiosError } from "axios";

interface Customer {
  id: number;
  name: string;
}

interface Produto {
  id: number;
  barcode: string;
  name: string;
  price: number;
  quantity: number;
}

type Input = {
  customer_id?: number;
  user_id?: number;
  payment_id: string;
  discount?: number;
  products?: Produto[];
  number_payments?: number;
};

interface ApiError {
  message?: string;  // Mensagem genérica de erro (opcional)
  error?: string;    // Detalhes específicos do erro (opcional)
}

// Validation
const schema = Yup.object().shape({
  // begin error
  discount: Yup.number()
    .transform((value, originalValue) => {
      if (originalValue === null || originalValue === undefined) {
        return undefined;
      }
      return Number(originalValue); // Remova espaços em branco extras
    }),
  customer_id: Yup.number()
    .transform((value, originalValue) => {
      if (originalValue === "" || originalValue === undefined) {
        return undefined;
      }
      return Number(originalValue); // Remova espaços em branco extras
    }),

  user_id: Yup.number()
    .transform((value, originalValue) => {
      if (originalValue === "" || originalValue === undefined) {
        return undefined;
      }
      return Number(originalValue); // Remova espaços em branco extras
    }),

  number_payments: Yup.number()
    .transform((value, originalValue) => {
      if (originalValue === "" || originalValue === undefined) {
        return undefined;
      }
      return Number(originalValue); // Remova espaços em branco extras
    }),

  products: Yup.array()
    .transform((value, originalValue) => {
      if (originalValue === "" || originalValue === undefined) {
        return undefined;
      }
      return Number(originalValue); // Remova espaços em branco extras
    }),

  payment_id: Yup.string()
    .transform((value, originalValue) => {
      if (originalValue === "" || originalValue === undefined) {
        return undefined;
      }
      return String(originalValue); // Remova espaços em branco extras
    })
    .required('Campo obrigatório')
});

export default function CreateOrders() {
  const [customer, setCustomer] = useState<Customer[] | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<Produto[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Produto | null>(null);
  const [product, setProduct] = useState<Produto[]>([]);
  const [openModalList, setOpenModalList] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);
  const { user } = useUser();
  const [openModalParcel, setOpenModalParcel] = useState(false);
  // ModalConfirm
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [successText, setSuccessText] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<boolean | null>(null);
  const [errorMsgTxt, setErrorMsgTxt] = useState('');

  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState, watch, control, resetField } = useForm<Input>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });
  const discount = watch("discount", 0);
  const userId = (user?.id);
  const { errors } = formState;

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        let url = 'product';
        if (searchTerm.trim() !== "") {
          url = `product?search=${searchTerm}`;
        }
        const [responseCustomer, productResponse] = await Promise.all([
          axios_product.get('v1/customer-find-all'),
          axios_product.get(`v1/${url}`)
        ]);

        setCustomer(responseCustomer.data);
        setProduct(productResponse.data.data);

      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [searchTerm]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const id = event.target.id;
    setSearchTerm(value);
    if (value === '') {
      setSearchTerm('')
      setOpenModalList(false);
    } else {
      setOpenModalList(true);
    }

  };

  const handleCampClick = (product: Produto) => {
    setSelectedProduct(product);
    setOpenModalList(false);
    setSearchTerm(product.name);
  };

  const handleDeleteProduct = (index: number) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.filter((_, i) => i !== index)
    );
  };

  const handleLaunchClick = () => {
    if (selectedProduct && quantity > 0) {
      const productWithQuantity = {
        ...selectedProduct,
        quantity: quantity, // Inclua a quantidade ao adicionar o produto
      };
      setSelectedProducts((prevSelectedProducts) => [
        ...prevSelectedProducts,
        productWithQuantity,
      ]);
      // Limpe os campos após adicionar o produto
      setSelectedProduct(null);
      setQuantity(1);
      setSearchTerm("");
    }
  };

  const handlePaymentChange = (e: any) => {
    const selectedMethod = e.target.value;

    // Verifica se o método de pagamento selecionado é "Cartão de Crédito" (ajuste o valor conforme o necessário)
    if (selectedMethod === "Cartão de Crédito") { // Supondo que o ID do Cartão de Crédito seja 1
      setOpenModalParcel(true);
    } else {
      setOpenModalParcel(false);
      resetField("number_payments");
    }
  };

  const calculateSubTotal = () => {
    return selectedProducts.reduce(
      (total, product) => total + Number(product.price) * product.quantity,
      0
    );
  };
  const calculateDiscountedTotal = () => {
    const total = calculateSubTotal();
    const discountValue = discount || 0; // Converte o desconto para número, padrão 0
    const discountedTotal = total - discountValue;
    return discountedTotal // Formata com duas casas decimais
  };

  const calculateParcelas = (qtd: number, taxa: number) => {
    const total = calculateDiscountedTotal() / qtd;
    return total + (total * (taxa / 100));
  }

  function formatarDinheiro(valor: number): string {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  const onSubmit: SubmitHandler<Input> = async (data) => {
    setLoading(true);

    try {
      const productIds = selectedProducts.map((product) => ({ id: product.id, quantity: product.quantity }));
      if (productIds.length > 0) {
        const payload = {
          customer_id: data.customer_id,
          user_id: userId,
          payment: data.payment_id,
          number_payments:data.number_payments,
          discount: data.discount || 0, // Defina desconto padrão se não houver
          products: selectedProducts.map(product => ({
            id: product.id,
            quantity: product.quantity,
          })),
        };
        console.log({...payload});
        const response = await axios_product.post('v1/order', {...payload});
        const statusCode = response.status;

        if (statusCode === 201) {
          setErrorMessage(false);
          setSuccessText(true);
          setOpenModalConfirm(true);
          window.location.href = '/Orders'
        }

      } else {
        setSuccessText(false);
        setErrorMessage(true);
        setOpenModalConfirm(true);
        setErrorMsgTxt('Por favor selecione os produtos!');
      }

    } catch (error) {
      console.log("Erro: ", error)
      setSuccessText(false);
      setErrorMessage(true);
      setOpenModalConfirm(true);
      if (axios.isAxiosError(error)) {
        const statusCode = (error as AxiosError).response?.status;
        const errorData = (error as AxiosError).response?.data as ApiError;

        if (errorData) {
          if (errorData.error) {
            console.log(errorData.error);
            setErrorMsgTxt(errorData.error);
          } else if (errorData.message) {
            setErrorMsgTxt(errorData.message);
          } else {
            setErrorMsgTxt('Erro de validação desconhecido.');
          }
        }

        else if (statusCode === 409) {
          setErrorMsgTxt('Já existe referência e/ou código de barras cadastrados');
        } else {
          setErrorMsgTxt(`Error with status code: ${statusCode}`);
        }
      } else {
        setErrorMsgTxt('Erro desconhecido: ' + error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Container>
      <ModalConfirm
        msgError={errorMessage}
        msgSuccess={successText}
        titleErr={errorMsgTxt}
        isOpen={openModalConfirm}
        setModalOpen={() => setOpenModalConfirm(false)}
      />
      <S.Content>
        <S.Title>
          <span>
            Vendas{'>'}
            <small>Cadastrar Vendas</small>
          </span>
        </S.Title>

        <S.Header>
          <S.HeaderSearch>
            <S.Input
              type='number'
              placeholder='1'
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />

            <S.InputRight>
              <S.DivInput>
                <button>
                  <CiSearch />
                </button>
                <input
                  type='text'
                  placeholder='Nome ou código'
                  onChange={handleInputChange}
                  value={searchTerm}
                />
              </S.DivInput>
              {
                openModalList &&
                <S.ListDados>
                  {product.map(function (val) {
                    return (
                      <li key={val.id}>
                        <button onClick={() => handleCampClick(val)}>
                          {val.name}
                        </button>
                      </li>
                    );
                  })}
                </S.ListDados>
              }
            </S.InputRight>
          </S.HeaderSearch>

          <S.Button onClick={handleLaunchClick}>
            <BsArrowReturnLeft />
            <span>Lançar</span>
          </S.Button>
        </S.Header>

        <S.ContainerBloc>
          <S.ContentLeft>
            <S.FormInput>
              <label>Cliente</label>
              <S.Filter
                id="customer_id"
                {...register('customer_id')}>
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
            </S.FormInput>

            <S.FormInput>
              <label>Forma de Pagamento</label>
              <S.Filter
                onClick={handlePaymentChange}
                id="payment_id"
                {...register('payment_id')}
              >
                <option value="Dinheiro">Dinheiro</option>
                <option value="Pix">Pix</option>
                <option value="Cartão de Crédito">Cartão de Crédito</option>
                <option value="Cartão de Débito">Cartão de Débito</option>
              </S.Filter>
              {errors.payment_id && (
                <small>{errors.payment_id.message}</small>
              )}
            </S.FormInput>
            {openModalParcel &&
              <S.FormInput>
                <label>Parcelas</label>
                <S.Filter
                  {...register("number_payments")}
                >
                  <option value=""
                    disabled selected hidden>
                    Selecione
                  </option>
                  <option value="1">1X {formatarDinheiro(calculateParcelas(1, 3.64))}</option>
                  <option value="2">2X {formatarDinheiro(calculateParcelas(2, 4.97))}</option>
                  <option value="3">3X {formatarDinheiro(calculateParcelas(3, 5.89))}</option>
                  <option value="4">4X {formatarDinheiro(calculateParcelas(4, 6.8))}</option>
                  <option value="5">5X {formatarDinheiro(calculateParcelas(5, 7.69))}</option>
                  <option value="6">6X {formatarDinheiro(calculateParcelas(6, 8.58))}</option>
                </S.Filter>
              </S.FormInput>
            }

            <S.FormInput>
              <label>Desconto</label>
              <Controller
                name="discount"
                control={control}
                rules={{ required: 'Este campo é obrigatório' }}
                render={({ field: { onChange, value, ref } }) => (
                  <NumericFormat
                    thousandSeparator="."
                    decimalSeparator=","
                    decimalScale={2}
                    fixedDecimalScale={true}
                    placeholder="R$ 0,00"
                    prefix="R$ "
                    value={value}
                    onValueChange={(values) => {
                      onChange(values.floatValue); // Use formattedValue to store the formatted string
                    }}
                    getInputRef={ref}
                  />
                )}
              />
            </S.FormInput>
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
                    <th>REMOVER</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedProducts.map((val, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{val.barcode}</td>
                      <td>{val.name}</td>
                      <td>{val.quantity}</td>
                      <td>
                        <NumericFormat
                          displayType={'text'}
                          thousandSeparator="."
                          decimalSeparator=","
                          decimalScale={2}
                          value={val.price}
                          fixedDecimalScale={true}
                          prefix='R$'
                        />
                      </td>
                      <td>
                        <button onClick={() => handleDeleteProduct(index)}>
                          <CiTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </S.TableProduct>
            </S.ListProduct>
            {errors.products && (
              <small>{errors.products.message}</small>
            )}

            <S.FormTotal>
              <div>
                <label>SUBTOTAL</label>
                <S.ValoresT>
                  <NumericFormat
                    displayType={'text'}
                    thousandSeparator="."
                    decimalSeparator=","
                    decimalScale={2}
                    value={calculateSubTotal()}
                    fixedDecimalScale={true}
                    prefix='R$ '
                  />
                </S.ValoresT>
              </div>
              <div>
                <label>TOTAL</label>
                <S.ValoresT>
                  <NumericFormat
                    displayType={'text'}
                    thousandSeparator="."
                    decimalSeparator=","
                    decimalScale={2}
                    value={calculateDiscountedTotal()}
                    fixedDecimalScale={true}
                    prefix='R$ '
                  /></S.ValoresT>
              </div>
            </S.FormTotal>
          </S.ContentRight>
        </S.ContainerBloc>

      </S.Content>
      <S.Footer>
        <ButtonAutolineCancel
          handleClick={() => window.location.href = '/Orders'}
          label="Cancelar Venda" />
        <S.Save
          onClick={handleSubmit(onSubmit)}
          type="submit"
          disabled={loading}>
          {loading ? 'Finalizando...' : 'Finalizar Venda'}
        </S.Save>
      </S.Footer>
    </S.Container>
  );
}
