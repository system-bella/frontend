import * as S from './style'
import { CiCirclePlus } from 'react-icons/ci';
import Tabela from '../../components/TabelaUser'
import Pagination from '../../components/Pagination';
import { useEffect, useState } from 'react';
import axios_product from '../../api/axios';
import CreateUser from '../../components/ModalUser/Create';
import { useUser } from '../../api/contextApi/userContext';
import Erro403 from '../../components/Error/Erro403';
import Loading from '../../components/Loading';
interface User {
    id: 1,
    first_name: string,
    last_name: string,
    email: string,
    is_admin: number,
}

export default function User() {
    const headers = ['#', 'Chave', 'Nome', 'E-mail', 'Usuário', 'Ações'];
    const [userList, setUserList] = useState<User[]>([]);
    const [openModalCreate, setOpenModalCreate] = useState(false);

    const { user } = useUser();
    const isAdmin = user?.is_admin === 1 || user?.is_admin === true;
    //Paginas
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [perPage, setPerPage] = useState();
    const [lastPage, setLastPage] = useState();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                let url = 'user?page=' + currentPage;
                const response = await axios_product.get(`v1/${url}`);
                setUserList(response.data.data);
                setTotalPages(response.data.last_page);
                setPerPage(response.data.per_page);
                setLastPage(response.data.last_page);

            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false); // Define o estado de carregamento como concluído
            }
        };
        fetchData();
    }, [currentPage]);

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const goToPrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    if (isLoading) {
        return <Loading />; // Exibe um componente de carregamento enquanto os dados estão sendo carregados
    }
    if (!isAdmin) {
        return (
            <Erro403 />
        );
    }

    else {
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
                                {(user.first_name[0] + user.last_name[0]).toLocaleUpperCase()}
                            </p>
                        </S.Imagem>
                        <S.Infor>
                            <h2>{user.first_name + " " + user.last_name}</h2>
                            <p>{user.is_admin === 1 ? 'Administrador' : 'Atendente'}</p>
                            <p>{user.email}</p>
                        </S.Infor>
                    </S.InforUser>

                    <Tabela
                        linhaHead={headers}
                        dados={userList} />
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
    // return null;
}