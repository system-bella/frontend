import { useRef } from 'react';
import Qrcode from 'react-qr-code';
import html2canvas from 'html2canvas';
import * as S from './styles';

interface IQRCode {
  name: string;
  price: string | undefined;
}

export default function QRCode(
  { name,
    price }: IQRCode) {
  const targetRef = useRef<HTMLDivElement>(null);

  const handleCapture = () => {
    if (targetRef.current) {
      html2canvas(targetRef.current)
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.href = imgData;
          link.download = `qrcode_${name}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((error) => {
          console.error('Erro ao capturar elemento:', error);
        });
    }
  };

  return (
    <div>
      <S.Container>
        <S.PrintQrcode ref={targetRef}>
          <Qrcode value={name} size={100} />
          <S.Label>
            <img src={require('../../assets/logo.png')} />
            <p>
              <strong>PRODUTO:</strong> {name}
            </p>
            <h1>R$ {price}</h1>
          </S.Label>
        </S.PrintQrcode>
        <S.CaputureQrcode onClick={handleCapture}>
          Exportar QRCode
        </S.CaputureQrcode>
      </S.Container>
    </div>
  );
}
