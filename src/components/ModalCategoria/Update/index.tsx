import React, { useEffect, useState } from "react";
import styled from "styled-components";
import IlayoutModal from "../../IlayoutModal";
import axios_product from "../../../api/axios"

import * as Yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from "axios";

interface IModalCreateProps {
  isOpen: boolean;
  setModalOpen: any;
  itemId: number | null;
  // onClose: (newCategory: Input | null) => void;
  onClose: any;
}

interface Input {
  category: string,
}

// Validation
const schema = Yup.object().shape({
  // begin error
  category: Yup.string()
    .transform((value, originalValue) => {
      if (originalValue === null || originalValue === undefined) {
        return undefined;
      }
      return String(originalValue).trim(); // Remova espaços em branco extras
    })
    .required('Campo obrigatório')
});


export default function EditCategoria(
  { isOpen,
    setModalOpen,
    itemId, 
    onClose
  }: IModalCreateProps) {

  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState, reset, setValue } = useForm<Input>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const { errors } = formState;

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {

        const response = await axios_product.get(`v1/category/${itemId}`);
        const customerData = response.data;

        for (const key in customerData) {
          setValue(key as keyof Input, customerData[key]);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    if (itemId) {
      fetchProductDetails();
    }
  }, [itemId]);

  const onSubmit: SubmitHandler<Input> = async (data) => {
    setLoading(true);
    try {
      const response = await axios_product.put(`v1/category/${itemId}`, { ...data });
      const statusCode = response.status;
      
      if (statusCode === 200) {
        alert('Categoria salvo com sucesso!');
        const createdCategory = response.data;
        onClose(createdCategory);
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

  if (isOpen) {
    return (
      <Container>
        <IlayoutModal
          titleName="Categoria"
          titleRestName="Editar"
          setModalClose={setModalOpen}
          loading={loading}
          setModalFunctionRight={handleSubmit(onSubmit)}>
            <DivInput>
              <label>Nome da Categoria *</label>
              <Input
                {...register('category')}
                type="text"
                placeholder="Pesquise a categoria"
              />
              {errors.category && (
                <small>{errors.category.message}</small>
              )}
            </DivInput>
        </IlayoutModal>
      </Container>
    )

  }
  return null;
}


export const Container = styled.div`
  p{
    color: ${(props) => props.theme.colors.primary
  };
    display: flex;
    align-items: center;
    gap: 5px;
  }
`

// conten label+input
export const DivInput = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0px;
  gap: 5px;

  small {
    color: ${(props) => props.theme.colors.warning};
  }
`;

//input
export const Input = styled.input`
  border: 1px solid ${(props) => props.theme.colors.secondary.gray_100};
  border-radius: 6px;
  padding: 10px 16px;
  &::placeholder {
    font-size: 16px;
  }
  width: 100%;
  height: 44px;
`;

export const Button = styled.button`
  width: 160px;
  background-color: transparent;
`

export const ListDados = styled.div`
  position: absolute;
  top: 45px;
  min-width: 50%;
`

export const ListModal = styled.div`
  position: relative;
`