import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IMaskInput } from 'react-imask';
import * as Yup from 'yup';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from "axios";
import axios_product from '../../../api/axios';
import ModalConfirm from '../../../components/ModalConfirm'

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
    // ModalConfirm
    const [openModalConfirm, setOpenModalConfirm] = useState(false);
    const [successText, setSuccessText] = useState<boolean | null>(null);
    const [errorMessage, setErrorMessage] = useState<boolean | null>(null);
    const [errorMsgTxt, setErrorMsgTxt] = useState('');

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
            const response = await axios_product.put(`v1/supplier/${itemId}`, data);
            const statusCode = response.status;

            if (statusCode === 200) {
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
                        <strong>Fornecedor{'>'}</strong>Cadastrar
                    </span>
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

export const Main = styled.div`
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