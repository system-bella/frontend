import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios_product from "../../../api/axios"
import ModalConfirm from '../../../components/ModalConfirm'

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
  category?: string,
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
    // .required('Campo obrigatório')
});


export default function EditCategoria(
  { isOpen,
    setModalOpen,
    itemId,
    onClose
  }: IModalCreateProps) {

  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState, setValue } = useForm<Input>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const { errors } = formState;
  // ModalConfirm
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [successText, setSuccessText] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<boolean | null>(null);
  const [errorMsgTxt, setErrorMsgTxt] = useState('');

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
        setOpenModalConfirm(false);
        
        const createdCategory = response.data;
        onClose(createdCategory);
      }
    } catch (error) {
      setOpenModalConfirm(true);
      setErrorMessage(true);
      setSuccessText(false);
      if ((error as AxiosError).response) {
        const statusCode = (error as AxiosError).response?.status;
        
        if (statusCode === 409) {
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

  const handleCloseModal = () => {
    setModalOpen();
    setOpenModalConfirm(false);
  };

  if (isOpen) {
    return (
      <Main>
        <ModalConfirm
          msgError={errorMessage}
          msgSuccess={successText}
          titleErr={errorMsgTxt}
          isOpen={openModalConfirm}
          setModalOpen={() => setOpenModalConfirm(false)}
        />
        <Container>
          <span>
            <strong>Categoria{'>'}</strong>Editar
          </span>
          <DivInput>
            <label>Nome da Categoria *</label>
            <Input
              {...register('category')}
              type="text"
              placeholder="Informe a categoria"
            />
            {errors.category && (
              <small>{errors.category.message}</small>
            )}
          </DivInput>

          <Actions>
            <Cancel onClick={handleCloseModal}>Cancelar</Cancel>
            <Save
              onClick={handleSubmit(onSubmit)}
              type="submit"
              disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar'}
            </Save>
          </Actions>
        </Container>
      </Main>
    )

  }
  return null;
}

export const Main = styled.main`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(0,0,0, 0.15);
  z-index: 1000;

  display: flex;
  justify-content: center;
  align-items: center;
`

export const Container = styled.div`
  border: 1px solid ${(props) => props.theme.colors.secondary.gray_100};
  border-radius: 16px;
  width: 500px;
  font-size: 15px;
  padding: 8px;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 10px;

  display: flex;
  flex-direction: column;
  padding: 20px;

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
  margin: 10px 0px 20px 0px;
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

export const Actions = styled.div`
  margin: 50px 10px 10px 10px;
  display: flex;
  justify-content: end;
`;

export const Cancel = styled.button`
  font-size: 16px;
  color: ${(props) => props.theme.colors.black};
  padding: 10px;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.colors.black};
  border-radius: 10px;

  margin-right: 20px;
`;

export const Save = styled.button`
  margin-left: 16px;

  font-size: 16px;
  color: ${(props) => props.theme.colors.white};

  background-color: ${(props) => props.theme.colors.primary};

  padding: 10px;
  border-radius: 10px;
`;