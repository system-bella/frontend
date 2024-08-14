import * as S from './style'
import { CiCirclePlus } from 'react-icons/ci';
import Tabela from '../../components/Tabela'
import Pagination from '../../components/Pagination';
import { useEffect, useState } from 'react';
import axios_product from '../../api/axios';
import CreateUser from '../../components/ModalUser/Create';

interface User {
    id: 1,
    first_name: string,
    last_name: string,
    email: string,
    is_admin: number,
}

export default function User() {
    const headers = ['#', 'Chave', 'Nome', 'E-mail', 'Usuário', 'Ações'];
    const [user, setUser] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [openModalCreate, setOpenModalCreate] = useState(false);

    //Paginas
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [perPage, setPerPage] = useState();
    const [lastPage, setLastPage] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                let url = 'user?page=' + currentPage;
                if (searchTerm) {
                    url = `user?search=${searchTerm}`;
                }
                const response = await axios_product.get(`v1/${url}`);
                setUser(response.data.data);
                setTotalPages(response.data.last_page);
                setPerPage(response.data.per_page);
                setLastPage(response.data.last_page);

            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, [currentPage, searchTerm]);

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const goToPrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <S.Container>
            <S.Content>
                <S.Title>
                    <span>
                        Usuários{'>'}
                        <small>Todos os Usuários</small>
                    </span>
                    <S.Header>
                        <S.NewItem
                            onClick={() => {
                                setOpenModalCreate(true);
                            }}
                        >
                            <CiCirclePlus />
                            <span>Novo</span>
                        </S.NewItem>
                    </S.Header>
                </S.Title>

                <S.InforUser>
                    <S.Imagem>
                        <p>
                            SK
                        </p>
                    </S.Imagem>
                    <S.Infor>
                        <h2>Sayury Kato</h2>
                        <p>Administrador</p>
                        <p>admin@admin.com</p>
                    </S.Infor>
                </S.InforUser>

                <Tabela
                    linhaHead={headers}
                    dados={user} />
            </S.Content>

            <S.Footer>
                <Pagination
                    currentPage={currentPage}
                    lastPage={lastPage}
                    perPage={perPage}
                    prevPage={goToPrevPage}
                    nextPage={goToNextPage}
                />
            </S.Footer>

            {/* Modal */}

            <CreateUser
                isOpen={openModalCreate}
                setModalOpen={() => setOpenModalCreate(false)} />
        </S.Container>
    )
}