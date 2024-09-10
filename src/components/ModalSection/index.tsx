import { useState } from 'react';
import { GoAlert } from "react-icons/go";
import { useHistory } from 'react-router-dom';
import * as S from './style'

export default function ModalSection() {
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const handleRightButtonClick = async () => {
        setLoading(true)
        try {
            history.push('/');
        } catch (e) {
            alert(e);
        } finally {
            setLoading(false)
        }
    };

    return (
        <S.Container>
            <S.Content>
                <S.InputDuple>
                    <GoAlert />
                    <div>
                        <h4>Sua sessão expirou</h4>
                        <p>Faça login novamente para continuar usando o aplicativo.</p>
                    </div>
                </S.InputDuple>
                <S.Footer>
                    <S.ButtonDelete type="button" onClick={handleRightButtonClick} disabled={loading}>
                        {loading ? 'Login...' : 'Login'}
                    </S.ButtonDelete>
                </S.Footer>
            </S.Content>
        </S.Container>
    )
}