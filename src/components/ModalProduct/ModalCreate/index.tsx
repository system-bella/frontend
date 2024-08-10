import * as Yup from 'yup';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios_production from '../../../api/axios_production';
import { AxiosError } from 'axios';
import { NumericFormat } from 'react-number-format';
import React, { useState } from 'react';
//styles
import * as S from './styles';
import axios from 'axios';
interface IModalCreateProps {
  isOpen: boolean;
  setModalOpen: any;
}

interface IProductData {
  name: string;
  quantity: number;
  category_id: number;
  price: number;
  description?: string;
}

// Validation
const schema = Yup.object().shape({
  // begin error
  category_id: Yup.number()
    .transform((value, originalValue) => {
      if (originalValue === null || originalValue === undefined) {
        return undefined;
      }
      // return String(originalValue).trim();
      return Number(originalValue);
    })
    .required('Campo obrigatório'),

  name: Yup.string()
    .transform((value, originalValue) => {
      if (originalValue === null || originalValue === undefined) {
        return undefined;
      }
      return String(originalValue).trim(); // Remova espaços em branco extras
    })
    .required('Campo obrigatório'),

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

  quantity: Yup.number()
    .transform((value, originalValue) => {
      if (originalValue === '' || isNaN(originalValue)) {
        return undefined;
      }
      return Number(originalValue); //
    })
    .required('Campo obrigatório')
});

export default function ModalCreate({
  isOpen,
  setModalOpen
}: IModalCreateProps) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState, reset, control } = useForm<IProductData>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const { errors } = formState;
  // console.log('erros: ', errors);

  const onSubmit: SubmitHandler<IProductData> = async (data) => {
    setLoading(true);
    try {
      // const response = await axios_production.post('/product', data);
      const response = await axios.post('http://127.0.0.1:8000/api/product', {...data});
      const statusCode = response.status;
      console.log(response);

      if (statusCode === 201) {
        alert('Produto salvo com sucesso!');
        reset();
        window.location.reload();
      setLoading(false);
      }
    } catch (error) {
      if ((error as AxiosError).response) {
        const statusCode = (error as AxiosError).response?.status;

        if (statusCode === 409) {
          alert('Já existe referência e/ou código de barras cadastrados');
          setLoading(false);
        } else {
          alert(`Error with status code: ${statusCode}`);
          setLoading(false);
        }
      } else {
        alert('Erro desconhecido: '+ error);
        setLoading(false);
      }
    }
  };

  if (isOpen) {
    return (
      <S.Container>
        <S.ContentModel>
          <S.ContentForm>
            <span>
              <strong>Produtos{'>'}</strong>Cadastrar produto
            </span>
            <S.Form onSubmit={handleSubmit(onSubmit)}>
              <S.FormInput>
                <label>Nome do Produto *</label>
                <S.Input
                  {...register('name')}
                  type="text"
                  placeholder="Informe o nome do produto"
                />
                {errors.name && (
                  <small>{errors.name.message}</small>
                )}
              </S.FormInput>
              <div>
                <S.FormInput>
                  <label>Categoria *</label>
                  <S.Input
                    {...register('category_id')}
                    type="number"
                    placeholder="Informe a categoria"
                  />
                  {errors.category_id && <small>{errors.category_id.message}</small>}
                </S.FormInput>
                <S.FormInput>
                  <label>Quantidade *</label>
                  <S.Input
                    {...register('quantity')}
                    type="number"
                    placeholder="Informe a quantidade"
                  />
                  {errors.quantity && <small>{errors.quantity.message}</small>}
                </S.FormInput>
              </div>
              <div>
                <S.FormInput>
                  <label>Fornecedor *</label>
                  <S.Input
                    // {...register('name_product')}
                    type="text"
                    placeholder="Informe o fornecedor"
                  />
                  {/* {errors.name_product && (
                    <small>{errors.name_product.message}</small>
                  )} */}
                </S.FormInput>
                <S.FormInput>
                  <label>Preço *</label>
                  {/* <S.Input
                    {...register('price')}
                    type="text"
                    placeholder="Informe o preço"
                  /> */}
                  
                  <Controller
                    name="price"
                    control={control}
                    rules={{ required: "Este campo é obrigatório" }}
                    render={({ field: { onChange, value, ref } }) => (
                      <NumericFormat
                        thousandSeparator="."
                        decimalSeparator=","
                        decimalScale={2}
                        fixedDecimalScale={true}
                        placeholder="Informe o valor R$"
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
                <S.Cancel onClick={setModalOpen}>Cancelar</S.Cancel>
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
