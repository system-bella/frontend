import React, { useEffect, useState } from "react";
import styled from "styled-components";
import IlayoutModal from "../../IlayoutModal";
import { IMaskInput } from 'react-imask';
import * as Yup from 'yup';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from "axios";
import axios_product from '../../../api/axios';

interface IModalCreateProps {
    isOpen: boolean;
    setModalOpen: any;
    itemId: number | null;
}

interface IData {
    name: string,
    description?: string,
    contact?: string,
    email?: string,
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

    description: Yup.string()
        .transform((value, originalValue) => {
            if (originalValue === null || originalValue === undefined) {
                return undefined;
            }
            return String(originalValue); //
        }),

    contact: Yup.string()
        .transform((value, originalValue) => {
            if (originalValue === null || originalValue === undefined) {
                return undefined;
            }
            return String(originalValue); //
        }),


    email: Yup.string()
        .transform((value, originalValue) => {
            if (originalValue === null || originalValue === undefined) {
                return undefined;
            }
            return String(originalValue); //
        }),



});

export default function UpdateFornecedor(
    { isOpen,
        setModalOpen,
        itemId
    }: IModalCreateProps) {

    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState, reset, control, setValue } = useForm<IData>({
        mode: 'onBlur',
        resolver: yupResolver(schema)
    });
    const { errors } = formState;

    useEffect(() => {
        const fetchProductDetails = async () => {
          try {
    
            const response = await axios_product.get(`v1/supplier/${itemId}`);
            const customerData = response.data;
    
            for (const key in customerData) {
              setValue(key as keyof IData, customerData[key]);
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
            console.log(data);
            const response = await axios_product.put(`v1/supplier/${itemId}`, data);
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

    if (isOpen) {
        return (
            <Container>
                <IlayoutModal
                    setModalFunctionRight={handleSubmit(onSubmit)}
                    titleName="Fornecedor"
                    titleRestName="Cadastrar"
                    setModalClose={setModalOpen}
                    loading={loading}>
                    <div>
                        <FormInput>
                            <label>Nome *</label>
                            <Input
                                {...register('name')}
                                type="text"
                                placeholder="Nome do fornecedor"
                                maxLength={30}
                            />
                            {errors.name && <small>{errors.name.message}</small>}
                        </FormInput>
                    </div>
                    <div>
                        <FormInput>
                            <label>Contato</label>
                            <Controller
                                name="contact"
                                control={control}
                                render={({ field }) => (
                                    <IMaskInput
                                        className='imask'
                                        id="phone_primary"
                                        mask="(00)00000-0000"
                                        placeholder="(00) 00000-000"
                                        {...field}
                                    />
                                )}
                            />
                        </FormInput>
                        <FormInput>
                            <label>Email</label>
                            <Input
                                {...register('email')}
                                type="email"
                                placeholder="e-mail"
                                maxLength={30}
                            />
                        </FormInput>
                    </div>
                    <div>
                        <FormInput>
                            <label>Descrição</label>
                            <TextArea
                                {...register('description')}
                                rows={4}
                                placeholder="Descrição..."
                            />
                        </FormInput>
                    </div>
                </IlayoutModal>
            </Container>
        )
    }
    return null;
}


export const Container = styled.div`
div{
    display: flex;
}
`

// conten label+input
export const FormInput = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  width: 100%;

  small {
    color: ${(props) => props.theme.colors.warning};
  }

  .imask{
    border: 1px solid ${(props) => props.theme.colors.secondary.gray_100};
    border-radius: 6px;
    padding: 10px 16px;

    &::placeholder {
      font-size: 16px;
    }

    width: 100%;
    height: 44px;
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

//TextArea
export const TextArea = styled.textarea`
  border: 1px solid ${(props) => props.theme.colors.secondary.gray_100};
  border-radius: 6px;
  padding: 10px 16px;
  &::placeholder {
    font-size: 16px;
  }
`;