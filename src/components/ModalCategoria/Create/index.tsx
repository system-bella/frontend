import React, { useEffect, useState } from "react";
import styled from "styled-components";
import IlayoutModal from "../../IlayoutModal";
import axios_product from "../../../api/axios"

import * as Yup from 'yup';
import { useForm, SubmitHandler} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from "axios";

interface IModalCreateProps {
    isOpen: boolean;
    setModalOpen: any;
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


export default function CreateCategoria(
    { isOpen,
        setModalOpen
    }: IModalCreateProps) {

    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState, reset} = useForm<Input>({
        mode: 'onBlur',
        resolver: yupResolver(schema)
      });

    const { errors } = formState;

    const onSubmit: SubmitHandler<Input> = async (data) => {
        setLoading(true);
        try {
            const response = await axios_product.post('v1/category', { ...data });
            console.log(response);
          const statusCode = response.status;
    
          if (statusCode === 201) {
            alert('Categoria salvo com sucesso!');
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
        } finally{
          setLoading(false);
        }
      };

    if (isOpen) {
        return (
            <Container>
                <IlayoutModal
                    titleName="Categoria"
                    titleRestName="Cadastrar"
                    setModalClose={setModalOpen}
                    loading={loading}
                    setModalFunctionRight={handleSubmit(onSubmit)}>
                    <DivInput>
                        <label>Nome da Categoria *</label>
                        <Input
                            {...register('category')}
                            type="text"
                            placeholder="Informe o nome da categoria"
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
`

// conten label+input
export const DivInput = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;

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