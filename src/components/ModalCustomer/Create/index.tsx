import * as Yup from 'yup';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios_product from '../../../api/axios';
import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { IMaskInput } from 'react-imask';
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

export default function CreateCustomer({
  isOpen,
  setModalOpen
}: IModalCreateProps) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState, reset, control, setValue } = useForm<IProductData>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const { errors } = formState;

  const onSubmit: SubmitHandler<IProductData> = async (data) => {
    setLoading(true);
    try {
      const response = await axios_product.post('v1/customer', data);
      const statusCode = response.status;

      if (statusCode === 201) {
        alert('Cliente salvo com sucesso!');
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
      <S.Container>
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
