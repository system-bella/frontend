import * as S from './style'
import TitleHeadSearch from '../../components/TitleHeadSearch'
import Tabela from '../../components/Tabela'
import Pagination from '../../components/Pagination';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
    id: 1,
    first_name: string,
    last_name: string,
    is_admin: number,
    email: string,
}

export default function User() {
    const headers = ['#', 'Chave', 'Nome', 'E-mail', 'Usuário', 'Ações'];
    const [user, setUser] = useState<User[]>([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/user').then(response => {
            console.log(response.data.data);
            setUser(response.data.data);
        })
    }, []);

    return (
        <S.Container>
            <S.Content>
                <TitleHeadSearch
                    title='Usuários'
                    restTitle='Todos os usuários'
                />

                <S.InforUser>
                    <S.Imagem>
                        <img src={require('../../assets/imgLateral.jpg')} alt="foto-perfil" />
                    </S.Imagem>
                    <S.Infor>
                        <h2>Sayury Kato</h2>
                        <p>Administrador</p>
                        <p>admin@admin.com</p>
                    </S.Infor>
                </S.InforUser>
                
                <Tabela
                    linhaHead={headers}
                    dados={user}/>
            </S.Content>

            <S.Footer>
                <Pagination
                    currentPage={1}
                    lastPage={undefined}
                    perPage={undefined}
                    prevPage={() => console.log('ola')}
                    nextPage={() => console.log('ola')}
                />
            </S.Footer>
        </S.Container>
    )
}