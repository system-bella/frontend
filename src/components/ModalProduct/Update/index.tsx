import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import axios_product from '../../../api/axios';
import { AxiosError } from 'axios';
import ListagemCategoria from '../../ModalCategoria/Listagem';
import { NumericFormat } from 'react-number-format';

import * as Yup from 'yup';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

//styles
import * as S from './styles';

interface IModalEditProps {
  isOpen: boolean;
  setModalOpen: any;
  itemId: number | null;
}

interface IData {
  name: string;
  quantity: number;
  category_id: string;
  supplier_id: number;
  price: number;
  description?: string;
}

interface Fornecedor {
  id: number,
  name: string,
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

  category_id: Yup.string()
    .transform((value, originalValue) => {
      if (originalValue === null || originalValue === undefined) {
        return undefined;
      }
      // return String(originalValue).trim();
      return String(originalValue);
    })
    .required('Campo obrigatório'),

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

});

export default function ModalEdit({
  isOpen,
  setModalOpen,
  itemId
}: IModalEditProps) {
  const [loading, setLoading] = useState(false);
  const [categoria, setCategoria] = useState(false);
  const [fornecedor, setFornecedor] = useState<Fornecedor[] | null>(null);
  const [searchCat, setSearchCat] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const { register, handleSubmit, formState, reset, control, setValue } = useForm<IData>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const { errors } = formState;

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {

        const [productResponse, fornecResponse] = await Promise.all([
          axios_product.get(`v1/product/${itemId}`),
          axios_product.get('v1/supplier-find-all'),
        ]);

        const customerData = productResponse.data;
        setFornecedor(fornecResponse.data);

        // Extrair o nome da categoria
      if (customerData.category && customerData.category.category) {
        setValue('category_id', customerData.category.category);
      }

      // Preencher os outros campos
      for (const key in customerData) {
        if (key !== 'category_id') {
          setValue(key as keyof IData, customerData[key]);
        }
      }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    if (itemId) {
      fetchProductDetails();
    }
  }, [itemId]);

  const onSubmit: SubmitHandler<IData> = async (data) => {
    setLoading(true);
    try {
      const payload = {
        name: data.name,
        quantity: data.quantity,
        category_id: categoryId || Number(data.category_id), // Certifique-se de que categoryId está sendo definido corretamente
        supplier_id: data.supplier_id,
        price: data.price,
      };
      console.log(payload);
      const response = await axios_product.put(`v1/product/${itemId}`, payload);
      const statusCode = response.status;

      if (statusCode === 200) {
        alert('Atualizado com sucesso!');
        reset();
        window.location.reload();
      }
    } catch (error) {
      if ((error as AxiosError).response) {
        const statusCode = (error as AxiosError).response?.status;

        if (statusCode === 409) {
          alert('Já existe referência e/ou código de barras cadastrados');
        } else {
          alert(`Error with status code: ${statusCode}`);
        }
      } else {
        alert('Erro desconhecido: ' + error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    if (value.trim() === "") {
      setCategoria(false);
      return;
    }

    setSearchCat(value);
    setCategoria(true);
    console.log(searchCat);
  }

  const handleSelectCategory = (category: string, id: number) => {
    setCategoryId(id);
    setValue("category_id", category); // Atualiza o valor do input
    setCategoria(false); // Fecha a lista de categorias
  };

  if (isOpen) {
    return (
      <S.Container>
        <S.ContentModel>
          <S.ContentForm>
            <span>
              <strong>Produtos{'>'}</strong>Editar Produto
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
                  <S.Filter
                    id='fornecedor'
                    {...register('supplier_id')}>
                    <option
                      value="" disabled selected hidden>
                      Selecione
                    </option>
                    {
                      fornecedor?.map((val) => {
                        return (
                          <option key={val.id} value={val.id}>{val.name}</option>
                        )
                      })
                    }
                  </S.Filter>
                  {errors.supplier_id && (
                    <small>{errors.supplier_id.message}</small>
                  )}
                </S.FormInput>

                <S.FormInput>
                  <label>Categoria *</label>
                  <S.ListModal>
                    <S.Input
                      id='category_id'
                      {...register('category_id')}
                      type="text"
                      placeholder="Informe a categoria"
                      onChange={handleSearchChange}
                      onFocus={() => setCategoria(true)} />

                    <S.ListDados>
                      {
                        categoria &&
                        <ListagemCategoria
                          searchTerm={searchCat}
                          onSelectCategory={handleSelectCategory} />
                      }
                    </S.ListDados>
                  </S.ListModal>
                  {errors.category_id && <small>{errors.category_id.message}</small>}
                </S.FormInput>
              </div>
              <div>
                <S.FormInput>
                  <label>Quantidade *</label>
                  <S.Input
                    {...register('quantity')}
                    type="number"
                    placeholder="1"
                  />
                  {errors.quantity && <small>{errors.quantity.message}</small>}
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
                <S.Save type="submit">
                  {loading ? 'Atualizando...' : 'Atualizar'}
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
