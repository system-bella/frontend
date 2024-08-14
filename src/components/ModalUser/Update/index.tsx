import * as Yup from 'yup';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios_product from '../../../api/axios';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { CiLock, CiUnlock } from 'react-icons/ci';
//styles
import * as S from './styles';

interface IModalCreateProps {
  isOpen: boolean;
  setModalOpen: any;
  itemId: number | null;
}

interface IUserData {
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  password_confirmation: string,
  is_admin: number,
}

interface ApiError {
  message: string;
  errors?: {
    [key: string]: string[]; // Campos de erro e suas mensagens
  };
}

// Validation
const schema = Yup.object().shape({
  // begin error
  first_name: Yup.string()
    .transform((value, originalValue) => {
      if (originalValue === null || originalValue === undefined) {
        return undefined;
      }
      return String(originalValue).trim(); // Remova espaços em branco extras
    })
    .required('Campo obrigatório'),

  last_name: Yup.string()
    .transform((value, originalValue) => {
      if (originalValue === null || originalValue === undefined) {
        return undefined;
      }
      return String(originalValue).trim(); // Remova espaços em branco extras
    })
    .required('Campo obrigatório'),

  email: Yup.string()
    .transform((value, originalValue) => {
      if (originalValue === null || originalValue === undefined) {
        return undefined;
      }
      return String(originalValue).trim(); // Remova espaços em branco extras
    })
    .required('Campo obrigatório'),

  password: Yup.string()
    .transform((value, originalValue) => {
      if (originalValue === null || originalValue === undefined) {
        return undefined;
      }
      return String(originalValue).trim(); // Remova espaços em branco extras
    })
    .required('Campo obrigatório'),

  password_confirmation: Yup.string()
    .transform((value, originalValue) => {
      if (originalValue === null || originalValue === undefined) {
        return undefined;
      }
      return String(originalValue).trim(); // Remova espaços em branco extras
    })
    .required('Campo obrigatório'),

  is_admin: Yup.number()
    .transform((value, originalValue) => {
      if (originalValue === "" || originalValue === undefined) {
        return undefined;
      }
      return Number(originalValue);
    })
    .required('Campo obrigatório'),


});

export default function UpdateUser({
  isOpen,
  setModalOpen,
  itemId,
}: IModalCreateProps) {

  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState, reset, control, setValue } = useForm<IUserData>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });
  const [locked, setLocked] = useState(true);
  const { errors } = formState;

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {

        const response = await axios_product.get(`v1/user/${itemId}`);
        const customerData = response.data;
        console.log(response.data);

        for (const key in customerData) {
          setValue(key as keyof IUserData, customerData[key]);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    if (itemId) {
      fetchProductDetails();
    }
  }, [itemId]);

  const onSubmit: SubmitHandler<IUserData> = async (data) => {
    setLoading(true);
    try {
      console.log(data);
      // const response = await axios_product.post('v1/user', data);
      // const statusCode = response.status;

      // if (statusCode === 201) {
      //   alert('Cliente salvo com sucesso!');
      //   window.location.reload();
      // }
    } catch (error) {
      if ((error as AxiosError).response) {
        const statusCode = (error as AxiosError).response?.status;
        const errorData = (error as AxiosError).response?.data as ApiError;

        if (statusCode === 422 && errorData) {
          let errorMessages = 'Por favor, corrija os seguintes erros:\n';

          // Coletar todas as mensagens de erro
          if (errorData.errors) {
            for (const [field, messages] of Object.entries(errorData.errors)) {
              errorMessages += `${messages.join(', ')}\n`;
            }
          }

          // Exibir todas as mensagens de erro em um único alert
          alert(errorMessages || 'Erro de validação desconhecido.');
        }

        if (statusCode === 409) {
          alert('Já existe referência e/ou código de barras cadastrados');
        }
        // else {
        //   alert(`Error with status code: ${statusCode}`);
        // }
      } else {
        alert('Erro desconhecido: ' + error);
      }
    } finally {
      setLoading(false);
    }
  };

  if (isOpen) {
    return (
      <S.Container>
        <S.ContentModel>
          <S.ContentForm>
            <span>
              <strong>Usuário{'>'}</strong>Editar
            </span>
            <S.Form onSubmit={handleSubmit(onSubmit)}>

              <div>
                <S.FormInput>
                  <label>Nome *</label>
                  <S.Input
                    {...register('first_name')}
                    type="text"
                    placeholder="Nome do usuário"
                    maxLength={30}
                  />
                  {errors.first_name && <small>{errors.first_name.message}</small>}
                </S.FormInput>

                <S.FormInput>
                  <label>Sobrenome *</label>
                  <S.Input
                    {...register('last_name')}
                    type="text"
                    placeholder="Sobrenome do usuário"
                    maxLength={30}
                  />
                  {errors.last_name && <small>{errors.last_name.message}</small>}
                </S.FormInput>
              </div>
              <div>
                <S.FormInput>
                  <label>Is_admin *</label>
                  <S.Filter
                    id='is_admin'
                    {...register('is_admin')}>
                    <option
                      value="" disabled selected hidden>
                      Selecione
                    </option>
                    <option value='1'>Sim</option>
                    <option value='0'>Não</option>
                  </S.Filter>
                  {errors.is_admin && <small>{errors.is_admin.message}</small>}
                </S.FormInput>
                <S.FormInput>
                  <label>E-mail *</label>
                  <S.Input
                    {...register('email')}
                    type="email"
                    placeholder="Informe o nome do produto"
                    autoComplete="off"
                  />
                  {errors.email && <small>{errors.email.message}</small>}
                </S.FormInput>
              </div>

              <div>
                <S.FormInput>
                  <label>Senha *</label>
                  <S.Input
                    autoComplete='off'
                    {...register('password')}
                    type={locked ? 'password' : 'text'}
                    placeholder="Informe a senha"
                    minLength={6}
                  />

                  {errors.password && <small>{errors.password.message}</small>}
                </S.FormInput>
                <S.FormInput>
                  <label>Confirmar Senha *</label>
                  <S.Input
                    autoComplete='off'
                    {...register('password_confirmation')}
                    type={locked ? 'password' : 'text'}
                    placeholder="Confirme a senha"
                    minLength={6}
                  />
                  {errors.password_confirmation && <small>{errors.password_confirmation.message}</small>}
                </S.FormInput>
              </div>
              <S.ButtonLook type="button" onClick={() => setLocked(!locked)}>
                {locked ? <CiLock /> : <CiUnlock />}
                <span>Mostrar Senha</span>
              </S.ButtonLook>
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
