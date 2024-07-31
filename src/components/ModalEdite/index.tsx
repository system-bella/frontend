import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import axios from '../../api/axios';
import { AxiosError } from 'axios';

//styles
import * as S from './styles';

interface IModalEditProps {
  isOpen: boolean;
  setModalOpen: any;
  itemId: number | null;
}

interface IData {
  reference: number;
  barcode: number;
  category: string;
  quantity: number;
  name_product: number;
  description: string;
  price: string;
}

export default function ModalEdit({
  isOpen,
  setModalOpen,
  itemId
}: IModalEditProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<IData>({
    reference: 0,
    barcode: 0,
    category: '',
    quantity: 0,
    name_product: 0,
    description: '',
    price: ''
  });

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`/products/${itemId}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    if (itemId) {
      fetchProductDetails();
    }
  }, [itemId]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put(`/products/${itemId}`, formData);
      const statusCode = response.status;

      if (statusCode === 200) {
        alert('Produto atualizado com sucesso!');
        setModalOpen();
        setLoading(false);
        window.location.reload();
      }
    } catch (error) {
      setLoading(false);
      if ((error as AxiosError).response) {
        const statusCode = (error as AxiosError).response?.status;

        if (statusCode === 409) {
          alert('Já existe referência e/ou código de barras cadastrados');
        } else {
          alert(`Erro com código de status: ${statusCode}`);
        }
      } else {
        alert('Erro desconhecido');
      }
    }
  };

  if (isOpen) {
    return (
      <S.Container>
        <S.ContentModel>
          <S.ContentForm>
            <span>
              <strong>Produtos{'>'}</strong>Editar Produto
            </span>
            <S.Form onSubmit={handleSubmit}>
              <div>
                <S.FormInput>
                  <label>Referência *</label>
                  <S.Input
                    type="text"
                    name="reference"
                    value={formData.reference}
                    onChange={handleInputChange}
                    placeholder="Referência"
                  />
                </S.FormInput>
                <S.FormInput>
                  <label>Código de Barras *</label>
                  <S.Input
                    type="text"
                    name="barcode"
                    value={formData.barcode}
                    onChange={handleInputChange}
                    placeholder="Informe o código de barras"
                  />
                </S.FormInput>
              </div>

              <div>
                <S.FormInput>
                  <label>Categoria *</label>
                  <S.Input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="Informe a categoria"
                  />
                </S.FormInput>
                <S.FormInput>
                  <label>Quantidade *</label>
                  <S.Input
                    type="text"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    placeholder="Informe a quantidade"
                  />
                </S.FormInput>
              </div>
              <div>
                <S.FormInput>
                  <label>Nome do Produto *</label>
                  <S.Input
                    type="text"
                    name="name_product"
                    value={formData.name_product}
                    onChange={handleInputChange}
                    placeholder="Informe o nome do produto"
                  />
                </S.FormInput>
                <S.FormInput>
                  <label>Preço *</label>
                  <S.Input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="Informe o preço"
                  />
                </S.FormInput>
              </div>

              <S.FormInput>
                <label>Descrição</label>
                <S.TextArea
                  rows={4}
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Descrição..."
                />
              </S.FormInput>
              <S.Actions>
                <S.Cancel onClick={setModalOpen}>Cancelar</S.Cancel>
                <S.Save type="submit">
                  {loading ? 'Atualizando...' : 'Atualizar'}
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
