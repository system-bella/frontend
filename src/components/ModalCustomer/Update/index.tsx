import * as S from './styles';
import ButtonAutolineCancel from '../../ButtonAutolineCancel';
import ButtonSave from '../../ButtonSave';

export default function EditClient() {
  return (
    <S.Container>
      <S.Content>

        <S.Title>
          <span>
            Cliente{'>'}
            <small>Editar Clientes</small>
          </span>
        </S.Title>

        <S.Form>
          <S.FormContent>
            <label>Nome *</label>
            <S.Input placeholder="Informe o nome do usuário" />
          </S.FormContent>
          <S.FormContent>
            <label>Telefone Principal *</label>
            <S.Input placeholder="(99) 99999-9999" />
          </S.FormContent>
          <S.FormContent>
            <label>Telefone alternativo</label>
            <S.Input placeholder="(99) 99999-9999" />
          </S.FormContent>
        </S.Form>

        <S.Form>
          <S.FormContent>
            <label>Data de nascimento *</label>
            <S.Input placeholder="dd/mm/yyyy" />
          </S.FormContent>
          <S.FormContent>
            <label>CPF *</label>
            <S.Input placeholder="000.000.000-00" />
          </S.FormContent>
          <S.FormContent>
            <label>RG *</label>
            <S.Input placeholder="0000000-0" />
          </S.FormContent>
        </S.Form>

        <S.Form>
          <S.FormContent>
            <label>CEP</label>
            <S.Input placeholder="69100-000" />
          </S.FormContent>
          <S.FormContent>
            <label>Rua</label>
            <S.Input placeholder="Rua" />
          </S.FormContent>
          <S.FormContent>
            <label>Número</label>
            <S.Input placeholder="Número" />
          </S.FormContent>
        </S.Form>

        <S.Form>
          <S.FormContent>
            <label>Bairro</label>
            <S.Input placeholder="Bairro" />
          </S.FormContent>
          <S.FormContent>
            <label>Complemento</label>
            <S.Input placeholder="Complemento" />
          </S.FormContent>
          <S.FormContent>
            <label>Cidade</label>
            <S.Input placeholder="Itacoatiara" required />
          </S.FormContent>
        </S.Form>
      </S.Content>

      <S.Footer>
        <ButtonAutolineCancel label="Cancelar" />
        <ButtonSave label="Salvar" />
      </S.Footer>
      
    </S.Container>
  );
}
