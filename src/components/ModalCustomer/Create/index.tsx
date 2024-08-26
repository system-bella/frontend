import * as Yup from 'yup';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios_product from '../../../api/axios';
import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { IMaskInput } from 'react-imask';
import ModalConfirm from '../../../components/ModalConfirm'

//styles
import * as S from './styles';

interface IModalCreateProps {
  isOpen: boolean;
  setModalOpen: any;
}

interface IProductData {
  name: string,
  cpf: string,
  contact?: string
}

// Validation
const schema = Yup.object().shape({
  name: Yup.string()
    .required('Campo obrigatório'),

  cpf: Yup.string()
    .required('Campo obrigatório'),

  contact: Yup.string()
});

export default function CreateCustomer({
  isOpen,
  setModalOpen
}: IModalCreateProps) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState, reset, control } = useForm<IProductData>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });
  const { errors } = formState;

  // ModalConfirm
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [successText, setSuccessText] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<boolean | null>(null);
  const [errorMsgTxt, setErrorMsgTxt] = useState('');

  const onSubmit: SubmitHandler<IProductData> = async (data) => {
    setLoading(true);
    try {
      const response = await axios_product.post('v1/customer', data);
      const statusCode = response.status;

      if (statusCode === 201) {
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
          setErrorMsgTxt('Já existe referência cadastrados');
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
    reset();
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
              <strong>Cliente{'>'}</strong>Cadastrar
            </span>
            <S.Form onSubmit={handleSubmit(onSubmit)}>
              <S.FormInput>
                <label>Nome do Cliente *</label>
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
                        value={field.value}
                        onChange={(e) => field.onChange((e.target as HTMLInputElement).value)}
                        inputRef={field.ref}
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
                <S.Cancel onClick={handleCloseModal}>Cancelar</S.Cancel>
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
