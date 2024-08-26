import * as Yup from 'yup';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios_product from '../../../api/axios';
import { AxiosError } from 'axios';
import { NumericFormat } from 'react-number-format';
import React, { useEffect, useState } from 'react';
import ModalConfirm from '../../../components/ModalConfirm'
//styles
import * as S from './styles';

interface IModalCreateProps {
  isOpen: boolean;
  setModalOpen: any;
}

interface IProductData {
  name: string;
  quantity: number;
  category_id: number;
  supplier_id: number;
  price: number;
  description?: string;
  purchase_value: number;
}

interface Fornecedor {
  id: number,
  name: string,
}

interface Categoria {
  id: number,
  category: string,
}

// Validation
const schema = Yup.object().shape({
  // begin error
  name: Yup.string()
    .transform((value, originalValue) => {
      if (originalValue === null || originalValue === undefined) {
        return undefined;
      }
      return String(originalValue).trim(); // Remova espaços em branco extras
    })
    .required('Campo obrigatório'),

  quantity: Yup.number()
    .transform((value, originalValue) => {
      if (originalValue === '' || isNaN(originalValue)) {
        return undefined;
      }
      return Number(originalValue); //
    })
    .required('Campo obrigatório'),

  category_id: Yup.number()
    .transform((value, originalValue) => {
      return originalValue === "" ? undefined : Number(originalValue);
    }).required('Campo obrigatório'),

  supplier_id: Yup.number()
    .transform((value, originalValue) => {
      return originalValue === "" ? undefined : Number(originalValue);
    }).required('Campo obrigatório'),


  description: Yup.string()
    .transform((value, originalValue) => {
      if (originalValue === null || originalValue === undefined) {
        return undefined;
      }
      return String(originalValue); //
    }),

  price: Yup.number()
    .transform((value, originalValue) => {
      if (originalValue === '' || isNaN(originalValue)) {
        return undefined;
      }
      return Number(originalValue); //
    })
    .required('Campo obrigatório'),

  purchase_value: Yup.number()
    .transform((value, originalValue) => {
      if (originalValue === '' || isNaN(originalValue)) {
        return undefined;
      }
      return Number(originalValue); //
    })
    .required('Campo obrigatório'),

});

export default function ModalCreate({
  isOpen,
  setModalOpen
}: IModalCreateProps) {
  const [loading, setLoading] = useState(false);
  const [categoria, setCategoria] = useState<Categoria[] | null>(null);
  const [fornecedor, setFornecedor] = useState<Fornecedor[] | null>(null);
  const { register, handleSubmit, formState, reset, control, setValue } = useForm<IProductData>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  // ModalConfirm
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [successText, setSuccessText] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<boolean | null>(null);
  const [errorMsgTxt, setErrorMsgTxt] = useState('');

  const { errors } = formState;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [responseForn, resposeCat] = await Promise.all([
          axios_product.get('v1/supplier-find-all'),
          axios_product.get('v1/category')
        ])
        setFornecedor(responseForn.data);
        setCategoria(resposeCat.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const onSubmit: SubmitHandler<IProductData> = async (data) => {
    setLoading(true);
    console.log(data);
    try {
      const response = await axios_product.post('v1/product', data);
      const statusCode = response.status;

      if (statusCode === 201) {
        setErrorMessage(false);
        setSuccessText(true);
        setOpenModalConfirm(true);
        window.location.reload();
      }
    } catch (error) {
      setSuccessText(false);
      setErrorMessage(true);
      setOpenModalConfirm(true);
      if ((error as AxiosError).response) {
        const statusCode = (error as AxiosError).response?.status;

        if (statusCode === 409) {
          setErrorMsgTxt('Já existe referência e/ou código de barras cadastrados');
        } else {
          setErrorMsgTxt(`Error: ${statusCode}`);
        }
      } else {
        setErrorMsgTxt('Erro desconhecido: ' + error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setModalOpen();
    reset();
  };

  if (isOpen) {
    return (
      <S.Container>
        <ModalConfirm
          msgError={errorMessage}
          msgSuccess={successText}
          titleErr={errorMsgTxt}
          isOpen={openModalConfirm}
          setModalOpen={() => setOpenModalConfirm(false)}
        />
        <S.ContentModel>
          <S.ContentForm>
            <span>
              <strong>Produtos{'>'}</strong>Cadastrar
            </span>
            <S.Form onSubmit={handleSubmit(onSubmit)}>
              <div>

                <S.FormInput>
                  <label>Nome do Produto *</label>
                  <S.Input
                    {...register('name')}
                    type="text"
                    placeholder="Nome do produto"
                  />
                  {errors.name && <small>{errors.name.message}</small>}
                </S.FormInput>

                <S.FormInput>
                  <label>Quantidade *</label>
                  <S.Input
                    {...register('quantity')}
                    type="number"
                    placeholder="0"
                  />
                  {errors.quantity && <small>{errors.quantity.message}</small>}
                </S.FormInput>
              </div>
              <div>
                <S.FormInput>
                  <label>Fornecedor *</label>
                  <S.Filter id="fornecedor" {...register('supplier_id')}>
                    <option value="" disabled selected hidden>
                      Selecione
                    </option>
                    {fornecedor?.map((val) => {
                      return (
                        <option key={val.id} value={val.id}>
                          {val.name}
                        </option>
                      );
                    })}
                  </S.Filter>
                  {errors.supplier_id && (
                    <small>{errors.supplier_id.message}</small>
                  )}
                </S.FormInput>
                <S.FormInput>
                  <label>Categoria *</label>
                  <S.Filter id="categoria" {...register('category_id')}>
                    <option value="" disabled selected hidden>
                      Selecione
                    </option>
                    {categoria?.map((val) => {
                      return (
                        <option key={val.id} value={val.id}>
                          {val.category}
                        </option>
                      );
                    })}
                  </S.Filter>
                  {errors.category_id && (
                    <small>{errors.category_id.message}</small>
                  )}
                </S.FormInput>
              </div>
              <div>
                <S.FormInput>
                  <label>Preço da Compra *</label>

                  <Controller
                    name="purchase_value"
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
                  {errors.purchase_value && <small>{errors.purchase_value.message}</small>}
                </S.FormInput>

                <S.FormInput>
                  <label>Preço Final *</label>

                  <Controller
                    name="price"
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
                  {errors.price && <small>{errors.price.message}</small>}
                </S.FormInput>
              </div>

              <S.FormInput>
                <label>Descrição</label>
                <S.TextArea
                  {...register('description')}
                  rows={4}
                  placeholder="Descrição..."
                />
              </S.FormInput>
              <S.Actions>
                <S.Cancel onClick={handleCloseModal}>Cancelar</S.Cancel>
                <S.Save type="submit" disabled={loading}>
                  {loading ? 'Salvando...' : 'Salvar'}
                </S.Save>
              </S.Actions>
            </S.Form>
          </S.ContentForm>
        </S.ContentModel>
      </S.Container>
    );
  }
  return null;
}
