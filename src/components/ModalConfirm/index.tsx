import React from "react";
import styled from "styled-components";
import { CiCircleRemove, CiCircleInfo, CiCircleAlert } from "react-icons/ci";
interface Props {
    titleErr: string;
    isOpen: boolean;
    setModalOpen: any;
    msgSuccess: any;
    msgError: any;
}
export default function ModalConfirm({
    titleErr,
    isOpen,
    setModalOpen,
    msgSuccess = null,
    msgError = null,
}: Props) {

    const handleCloseModal = () => {
        setModalOpen();
    };

    if (isOpen) {
        return (
            <Container>
                <Content className={msgSuccess ? 'corSucess bordarSucss' : 'corErr bordarErr'}>
                    {msgSuccess &&
                        <DivInfor>
                            <CiCircleInfo />
                            <Infor>
                                <h4>Confirmado</h4>
                                <p>Salvo com sucesso</p>
                            </Infor>
                        </DivInfor>
                    }
                    {msgError &&
                        <DivInfor>
                            <CiCircleAlert />
                            <Infor>
                                <h4>Error</h4>
                                <p>{titleErr}</p>
                            </Infor>
                        </DivInfor>
                    }
                    <Button onClick={handleCloseModal}>
                        <span className={msgSuccess ? 'corSucess' : 'corErr'}>
                            {<CiCircleRemove />}
                        </span>
                    </Button>
                </Content>
            </Container >
        )
    }
    return null;
}

export const Container = styled.div`
  position: fixed;
  right: 20px;  /* Ajuste para posicionar no canto superior direito */
  top: 20px;    /* Ajuste para posicionar no canto superior direito */
  z-index: 1000;
  

  .infor {
    p {
      font-size: 14px;
    }
  }
  .corSucess {
    color: #3b82f6;
  }
  .corErr {
    color: #ff3b30;
  }

  .bordarSucss {
    border-left: 6px solid #3b82f6;
  }
  .bordarErr {
    border-left: 6px solid #ff3b30;
  }
`;

export const Content = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    width: 350px;
    min-height: 80px;
    background: #ffffff88;   

    box-shadow: 0 8px 32px 0 rgba( 0, 0, 0, 0.2 );
    backdrop-filter: blur( 18.5px );
    -webkit-backdrop-filter: blur( 18.5px );
    border-radius: 10px;
    
    svg{
        font-size: 20px;
    }
`

export const DivInfor = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    
    svg{
        font-size: 34px;
    }
`

export const Infor = styled.div`
    p{
        font-size: 14px;
    }
`
export const Button = styled.button`
    background-color: transparent;
    display: flex;
`