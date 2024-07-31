import { useState } from 'react';
import * as S from './styles';
import { RiLockPasswordLine } from 'react-icons/ri';

export default function FormsLogin() {
  const logo = require('../../assets/logo.png');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const alternarVisibilidadeSenha = () => {
    setSenhaVisivel(!senhaVisivel);
  };

  return (
    <S.Container>
      <S.Logo>
        <img src={logo} alt="Logo Labela" />
      </S.Logo>
      <S.Formulario>
        <S.TextParagrafo>
          <p>
            <strong>Seja bem vindo!</strong>
          </p>
          <S.ColorParagrafo>
            <p>Para prosseguir, informe os dados abaixo.</p>
          </S.ColorParagrafo>
        </S.TextParagrafo>
        <div>
          <label htmlFor="email">E-mail*</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Digite seu e-mail"
          />
          <label htmlFor="senha">Senha*</label>
          <S.PasswordContain>
            <input
              type={senhaVisivel ? 'text' : 'password'}
              name="senha"
              id="senha"
              placeholder="Digite sua senha"
            />
            <button onClick={alternarVisibilidadeSenha}>
              <RiLockPasswordLine />
            </button>
          </S.PasswordContain>
          <div>
            <a href="#">Esqueceu a senha? Clique aqui</a>
          </div>
        </div>
      </S.Formulario>

      <a href="/Orders">Login</a>
    </S.Container>
  );
}
