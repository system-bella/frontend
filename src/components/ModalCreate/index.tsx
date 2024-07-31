import * as Yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from '../../api/axios';
import { AxiosError } from 'axios';

import React, { useState } from 'react';
//styles
import * as S from './styles';

interface IModalCreateProps {
  isOpen: boolean;
  setModalOpen: any;
}

interface IProductData {
  reference: number;
  barcode: number;
  category: string;
  name_product: string;
  description: string;
  price: number;
  quantity: number;
}

// Validation
const schema = Yup.object().shape({
  reference: Yup.number()
    .transform((value, originalValue) => {
      if (originalValue === '' || isNaN(originalValue)) {
        return undefined; // Retorna undefined para que o Yup não considere o campo
      }
      return Number(originalValue); // Converte o valor para número
    })
    .required('Campo obrigatório e único'),

  barcode: Yup.number()
    .transform((value, originalValue) => {
      if (originalValue === '' || isNaN(originalValue)) {
        return undefined; // Retorna undefined para que o Yup não considere o campo
      }
      return Number(originalValue); // Converte o valor para número
    })
    .required('Campo obrigatório e único'),

  // begin error
  category: Yup.string()
    .transform((value, originalValue) => {
      if (originalValue === null || originalValue === undefined) {
        return undefined;
      }
      return String(originalValue).trim();
    })
    .required('Campo obrigatório'),

  name_product: Yup.string()
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
    })
    .required('Campo obrigatório'),

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
  const { register, handleSubmit, formState, reset } = useForm<IProductData>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const { errors } = formState;
  console.log('erros: ', errors);

  const onSubmit: SubmitHandler<IProductData> = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post('/products', data);
      const statusCode = response.status;

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
        alert('Erro desconhecido');
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
              <div>
                <S.FormInput>
                  <label>Referência *</label>
                  <S.Input
                    {...register('reference')}
                    type="number"
                    placeholder="Referência"
                  />
                  {errors.reference && (
                    <small>{errors.reference.message}</small>
                  )}
                </S.FormInput>
                <S.FormInput>
                  <label>Código de Barras *</label>
                  <S.Input
                    {...register('barcode')}
                    type="number"
                    placeholder="Informe o código de barras"
                  />
                  {errors.barcode && <small>{errors.barcode.message}</small>}
                </S.FormInput>
              </div>

              <div>
                <S.FormInput>
                  <label>Categoria *</label>
                  <S.Input
                    {...register('category')}
                    type="text"
                    placeholder="Informe a categoria"
                  />
                  {errors.category && <small>{errors.category.message}</small>}
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
                  <label>Nome do Produto *</label>
                  <S.Input
                    {...register('name_product')}
                    type="text"
                    placeholder="Informe o nome do produto"
                  />
                  {errors.name_product && (
                    <small>{errors.name_product.message}</small>
                  )}
                </S.FormInput>
                <S.FormInput>
                  <label>Preço *</label>
                  <S.Input
                    {...register('price')}
                    type="text"
                    placeholder="Informe o preço"
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
                {errors.description && (
                  <small>{errors.description.message}</small>
                )}
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
