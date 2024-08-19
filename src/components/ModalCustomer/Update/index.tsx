import * as Yup from 'yup';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios_product from '../../../api/axios';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { IMaskInput } from 'react-imask';
//styles
import * as S from './styles';
import ModalConfirm from '../../../components/ModalConfirm'

interface IModalEditProps {
  isOpen: boolean;
  setModalOpen: any;
  itemId: number | null;
}


interface IData {
  name: string,
  cpf: string,
  contact?: string
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

  cpf: Yup.string()
    .transform((value, originalValue) => {
      if (originalValue === null || originalValue === undefined) {
        return undefined;
      }
      return String(originalValue).trim(); // Remova espaços em branco extras
    })
    .required('Campo obrigatório'),

  contact: Yup.string()
    .transform((value, originalValue) => {
      if (originalValue === null || originalValue === undefined) {
        return undefined;
      }
      return String(originalValue).trim(); // Remova espaços em branco extras
    })


});

export default function EditCustomer({
  isOpen,
  setModalOpen,
  itemId
}: IModalEditProps) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState, reset, control, setValue } = useForm<IData>({
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
    const fetchProductDetails = async () => {
      try {

        const response = await axios_product.get(`v1/customer/${itemId}`);
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
      const response = await axios_product.put(`v1/customer/${itemId}`, data);
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
              <strong>Cliente{'>'}</strong>Editar
            </span>
            <S.Form onSubmit={handleSubmit(onSubmit)}>
              <S.FormInput>
                <label>Nome do Cliente *</label>
                <S.Input
                  {...register('name')}
                  type="text"
                  placeholder="Informe o nome do cliente"
                />
                {errors.name && (
                  <small>{errors.name.message}</small>
                )}
              </S.FormInput>

              <div>
                <S.FormInput>
                  <label>CPF *</label>
                  <Controller
                    name="cpf"
                    control={control}
                    render={({ field }) => (
                      <IMaskInput
                        className='imask'
                        id="cpf"
                        mask="000.000.000-00"
                        placeholder="Digite o seu CPF"
                        {...field}
                      />
                    )}
                  />
                  {errors.cpf && <small>{errors.cpf.message}</small>}
                </S.FormInput>

                <S.FormInput>
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
                </S.FormInput>
              </div>

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
