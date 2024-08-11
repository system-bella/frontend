import { useState } from 'react';
import { useHistory } from 'react-router-dom';
//api
import api from '../../api/axios';
import axios, { AxiosError } from 'axios';
// form validation
import * as Yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// assets
const logo = require('../../assets/logo.png');
const imgLateral = require('../../assets/imgLateral.jpg');
import { CiLock, CiUnlock } from 'react-icons/ci';

// styles
import * as S from './styles';

interface ILogin {
  email: string;
  password: string;
}

const schema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required()
});

export default function Login() {
  const [locked, setLocked] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();

  const { register, handleSubmit, formState } = useForm<ILogin>({
    mode: 'all',
    resolver: yupResolver(schema)
  });

  const { errors } = formState;

  const handleLoginError = (err: AxiosError) => {
    if (axios.isAxiosError(err)) {
      const axiosError = err as AxiosError;

      if (axiosError.response?.status === 422)
        setError('Credenciais inválidas!');
    }
  };

  const initializeCSRF = async () => {
    await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie');
  };

  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    try {
      setLoading(!loading);

      await initializeCSRF(); // Inicializa a proteção CSRF

      const response = await api.post('login', data);

      console.log(response.data);

      if (response.status === 201) {
        history.push('/Product');
        setLoading(false);
        window.location.reload();
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        handleLoginError(err);
        setLoading(false);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Container>
      <S.ContentForm>
        <img src={logo} alt="logo da aplicação" />

        <S.Label>
          <h3>Seja bem vindo!</h3>
          <span>Para prosseguir, forneça os dados abaixo.</span>
        </S.Label>

        <S.Error>{error ? <p>{error}</p> : ''}</S.Error>

        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <S.InputEmail>
            <label>E-mail *</label>
            <S.Input
              {...register('email')}
              type="email"
              placeholder="Informe seu e-mail"
            />
            {errors.email ? <small>Email inválido</small> : ''}
          </S.InputEmail>

          <S.InputPassword>
            <label>Senha *</label>
            <div>
              <input
                {...register('password')}
                type={locked ? 'password' : ''}
                placeholder="Informe sua senha"
              />
              <S.ButtonLook type="button" onClick={() => setLocked(!locked)}>
                {locked ? <CiLock /> : <CiUnlock />}
              </S.ButtonLook>
            </div>
            {errors.password ? <small>Campo obrigatório</small> : ''}
          </S.InputPassword>

          <S.Login type="submit" disabled={loading}>
            {loading ? 'Carregando...' : 'Entrar'}
          </S.Login>
        </S.Form>
      </S.ContentForm>
      <S.ImgLateral>
        <img src={imgLateral} alt="Imagem Flores" />
      </S.ImgLateral>
    </S.Container>
  );
}
