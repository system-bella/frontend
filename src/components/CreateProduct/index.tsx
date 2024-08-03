import * as Yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from '../../api/axios_production';
import { AxiosError } from 'axios';

// styles
import * as S from './styles';

interface IProductData {
  reference: number;
  barcode: number;
  category: string;
  name_product: string;
  description: string;
  price: number;
  quantity: number;
}

// Validation
const schema = Yup.object().shape({
  reference: Yup.number()
    .transform((value, originalValue) => {
      if (originalValue === '' || isNaN(originalValue)) {
        return undefined; // Retorna undefined para que o Yup não considere o campo
      }
      return Number(originalValue); // Converte o valor para número
    })
    .required('Campo obrigatório e único'),

  barcode: Yup.number()
    .transform((value, originalValue) => {
      if (originalValue === '' || isNaN(originalValue)) {
        return undefined; // Retorna undefined para que o Yup não considere o campo
      }
      return Number(originalValue); // Converte o valor para número
    })
    .required('Campo obrigatório e único'),

  // begin error
  category: Yup.string()
    .transform((value, originalValue) => {
      if (originalValue === null || originalValue === undefined) {
        return undefined;
      }
      return String(originalValue).trim();
    })
    .required('Campo obrigatório'),

  name_product: Yup.string()
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
    })
    .required('Campo obrigatório'),

  price: Yup.number()
    .transform((value, originalValue) => {
      if (originalValue === '' || isNaN(originalValue)) {
        return undefined;
      }
      return Number(originalValue); //
    })
    .required('Campo obrigatório'),

  quantity: Yup.number()
    .transform((value, originalValue) => {
      if (originalValue === '' || isNaN(originalValue)) {
        return undefined;
      }
      return Number(originalValue); //
    })
    .required('Campo obrigatório')
});

export default function CreateProduct() {
  const { register, handleSubmit, formState, reset } = useForm<IProductData>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const { errors } = formState;
  console.log('erros: ', errors);

  const onSubmit: SubmitHandler<IProductData> = async (data) => {
    try {
      const response = await axios.post('/products', data);
      // Aqui você pode acessar o status code
      const statusCode = response.status;

      if (statusCode === 201) {
        alert('Success!');
        reset();
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
        alert('Erro desconhecido');
      }
    }
  };
  return (
    <S.Container>
      <S.Title>
        <span>
          Produtos {'>'}
          <small>Cadastrar Produto</small>
        </span>
      </S.Title>

      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.InputForm>
          <label>Referência *</label>
          <S.Input
            {...register('reference')}
            type="number"
            placeholder="Informe a referência"
          />
          {errors.reference && <small>{errors.reference.message}</small>}
        </S.InputForm>

        <S.InputForm>
          <label>Categoria *</label>
          <S.Input
            {...register('category')}
            type="text"
            placeholder="Informe a referência"
          />
          {errors.category && <small>{errors.category.message}</small>}
        </S.InputForm>
        <S.InputForm>
          <label>Quantidade *</label>
          <S.Input
            {...register('quantity')}
            type="number"
            placeholder="Informe a quantidade"
          />
          {errors.quantity && <small>{errors.quantity.message}</small>}
        </S.InputForm>

        <S.InputForm>
          <label>Nome do produto *</label>
          <S.Input
            {...register('name_product')}
            type="text"
            placeholder="Informe o nome do produto"
          />
          {errors.name_product && <small>{errors.name_product.message}</small>}
        </S.InputForm>
        <S.InputForm>
          <label>Preço R$ *</label>
          <S.Input
            {...register('price')}
            type="text"
            placeholder="Informe o preço do produto"
          />
          {errors.price && <small>{errors.price.message}</small>}
        </S.InputForm>

        <S.TextArea>
          <label>Descrição *</label>
          <S.TextAreaField
            {...register('description')}
            type="text"
            placeholder="Informe a descrição do produto"
          />
          {errors.description && <small>{errors.description.message}</small>}
        </S.TextArea>

        <S.Footer>
          <S.ButtonAutolineCancel href="/Product">
            Cancelar
          </S.ButtonAutolineCancel>
          <S.ButtonSave type="submit">Salvar</S.ButtonSave>
        </S.Footer>
      </S.Form>
    </S.Container>
  );
}
