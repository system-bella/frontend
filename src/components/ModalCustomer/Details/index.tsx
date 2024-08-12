import React from "react";
import * as S from './styled'
import { PiClipboardTextThin } from 'react-icons/pi';
import { CiCircleRemove } from 'react-icons/ci';

interface IModalDetailsProps {
  isOpen: boolean;
  setModalOpen: any;
  // itemId: number | null;
}

export default function Details({
  isOpen,
  setModalOpen,
  // itemId
}: IModalDetailsProps) {
  if (isOpen) {
    return (
      <S.Container>
        <S.Content>
          <S.Header>
            <S.Title>
              <PiClipboardTextThin />
              <div>
                <h4>Detalhes </h4>
                <span>Veja todos os detalhes sobre o cliente</span>
              </div>
            </S.Title>
            <button onClick={setModalOpen}>
              <CiCircleRemove />
            </button>
          </S.Header>
          <S.MainInformation>
            <h4>Informações principais</h4>
            <S.DivideInfo>
              <S.Info>
                <div>
                  <h5>Nome</h5>
                  <span>Fabiana Luiza de Souza Campos</span>
                </div>
                <div>
                  <h5>Celular</h5>
                  <span>(92) 99345-8416</span>
                </div>
              </S.Info>
              <S.Info>
                <div>
                  <h5>CPF</h5>
                  <span>111.222.3333-44</span>
                </div>
                <div>
                  <h5>RG</h5>
                  <span>8844789-6</span>
                </div>
              </S.Info>
              <S.Info>
                <div>
                  <h5>Data de Nascimento</h5>
                  <span>12 de dezembro de 2012 (11 anos)</span>
                </div>
              </S.Info>
              <S.InfoDescription>
                <div>
                  <h5>Edereço</h5>
                  <span>69100-000
                    Rua Roberto Carlos 550
                    Moisés Israel
                    Itacoatiara, AM 69100000</span>
                </div>
              </S.InfoDescription>


            </S.DivideInfo>
          </S.MainInformation>
        </S.Content>
      </S.Container>
    );
  }
  return null;
}
