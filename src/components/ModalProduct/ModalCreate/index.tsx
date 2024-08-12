import * as Yup from 'yup';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios_production from '../../../api/axios_production';
import { AxiosError } from 'axios';
import { NumericFormat } from 'react-number-format';
import React, { useState } from 'react';
import ListagemCategoria from '../../ModalCategoria/Listagem';
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
  const [categoria, setCategoria] = useState(false);
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
      const response = await axios.post('http://127.0.0.1:8000/api/product', { ...data });
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
        alert('Erro desconhecido: ' + error);
        setLoading(false);
      }
    }
  };

  const handleSearchChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    const id = event.target.id;

    if (value.trim() === "") {
      setCategoria(false);
      return;
    }

    if (id === 'categoria') {
      setCategoria(true);
    }
  };

  if (isOpen) {
    return (
      <S.Container>
        <S.ContentModel>
          <S.ContentForm>
            <span>
              <strong>Produtos{'>'}</strong>Cadastrar
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
                  <label>Fornecedor *</label>
                  <S.Filter id="fornecedor">
                    <option
                      disabled
                      selected hidden
                      value="">
                      Nenhum
                    </option>
                    <option value="fornecedor 1">fornecedor1</option>
                    <option value="fornecedor 2">fornecedor 1 2</option>
                    <option value="fornecedor 3">fornecedor 1 2</option>
                    <option value="fornecedor 4">fornecedor 1 4</option>
                    <option value="fornecedor 5">fornecedor 1 5</option>
                  </S.Filter>
                </S.FormInput>

                <S.FormInput>
                  <label>Quantidade *</label>
                  <S.Input
                    {...register('quantity')}
                    type="number"
                    placeholder="1"
                  />
                  {errors.quantity && <small>{errors.quantity.message}</small>}
                </S.FormInput>
              </div>
              <div>
                <S.FormInput>
                  <label>Categoria *</label>
                  <S.ListModal>
                    <S.Input
                      id='categoria'
                      {...register('category_id')}
                      type="number"
                      placeholder="Informe a categoria"
                      onChange={handleSearchChange} />

                    <S.ListDados>
                      {
                        categoria &&
                        <ListagemCategoria />
                      }
                    </S.ListDados>
                  </S.ListModal>
                  {errors.name && <small>{errors.name.message}</small>}
                </S.FormInput>

                <S.FormInput>
                  <label>Preço *</label>

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
