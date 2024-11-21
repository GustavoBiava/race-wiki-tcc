import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { FaTrashAlt } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";

import { AdminContainer, Table, Button } from '../../../styles/GlobalStyles';
import axios from '../../../services/axios';
import { 
    TitleHeader,
    Container,
    ButtonDiv,
    ButtonContainer,
    Content,
} from './styled';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Publications() {

    const [publications, setPublications] = useState([]);
    const navigate = useNavigate();
    const { isLogged, user } = useSelector(states => states.auth);

    const handleDeleteClick = (e) => {
        const id = e.currentTarget.parentNode.parentNode.id;
        try {
            (async function() {
                await axios.delete(`/publications/${id}`);
            })();
            return toast.success('Publicação deletada com sucesso!'); 
        }
        catch(err) {
            const errors = get(err, 'response.data.errors', []);
            return errors.map(e => toast.error(e));
        }
    }

    useEffect(() => {
        if (!isLogged) return navigate('/');
        if (user.type !== 'ADMIN') return navigate('/');
        try {
            (async function() {
                const response = await axios.get('/publications');
                return setPublications(response.data);
            })();
        }
        catch (err) {
            const errors = get(err, 'response.data.errors', []);
            return errors.map(e => toast.error(e));
        }
    }, [publications]);

    return (
        <AdminContainer>
             <Content>
                <TitleHeader>
                        <h1>PUBLICAÇÕES</h1>
                        <hr />
                </TitleHeader>

                <Container>
                    <Table>
                        <tr>
                            <th>ID</th>
                            <th>Título</th>
                            <th>Curtidas</th>
                            <th>Autor</th>
                            <th>Editado em</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                        { publications ? (
                            publications.map((publication, index) => (
                                <tr key={index} id={publication.id}>
                                    <td>{publication.id}</td>
                                    <td>{publication.title}</td>
                                    <td>{publication.likes}</td>
                                    <td>{get(publication, 'publication_author.nickname')}</td>
                                    <td>{publication.created_at}</td>
                                    <td>{publication.updated_at}</td>
                                    <td>
                                        <ButtonDiv>
                                            <Button>
                                                <MdEditSquare size={20}/>
                                            </Button>
                                        </ButtonDiv>
                                    </td>
                                    <td>
                                        <ButtonDiv onClick={handleDeleteClick}>
                                            <Button>
                                                <FaTrashAlt size={16}/>
                                            </Button>
                                        </ButtonDiv>
                                    </td>
                                </tr>
                            ))
                        ) : ''}
                    </Table>
                    <ButtonContainer>
                        <Button>ADICIONAR NOVO</Button>
                    </ButtonContainer>
                </Container>
            </Content>
        </AdminContainer>
    );

}

export default Publications;