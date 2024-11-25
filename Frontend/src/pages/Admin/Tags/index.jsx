import { useContext, useEffect, useState } from 'react';
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
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AdminContext } from '../../../contexts/AdminContext';

function Tags() {

    const [tags, setTags] = useState([]);
    const navigate = useNavigate();
    const { isLogged, user } = useSelector(states => states.auth);
    const { mode, unsetAdmin, setAdmin } = useContext(AdminContext);

    const handleDeleteClick = (e) => {
        const id = e.currentTarget.parentNode.parentNode.id;
        try {
            (async function() {
                await axios.delete(`/tags/${id}`);
            })();
            return toast.success('Tag deletada com sucesso!'); 
        }
        catch(err) {
            const errors = get(err, 'response.data.errors', []);
            return errors.map(e => toast.error(e));
        }
    }

    useEffect(() => {
        if (!isLogged) return navigate('/');
        if (user.type !== 'ADMIN') return navigate('/');
        if (mode !== 'admin') setAdmin();
        try {
            (async function() {
                const response = await axios.get('/tags');
                return setTags(response.data);
            })();
        }
        catch (err) {
            const errors = get(err, 'response.data.errors', []);
            return errors.map(e => toast.error(e));
        }
    }, [tags]);

    return (
        <AdminContainer>
             <Content>
                <TitleHeader>
                        <h1>TAGS</h1>
                        <hr />
                </TitleHeader>

                <Container>
                    <Table>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Tipo</th>
                            <th>Criado em</th>
                            <th>Editado em</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                        { tags ? (
                            tags.map((tag, index) => (
                                <tr key={index} id={tag.id}>
                                    <td>{tag.id}</td>
                                    <td>{tag.tag_name}</td>
                                    <td>{tag.type === 'DRIVER' ? 'Piloto' : 'Equipe'}</td>
                                    <td>{tag.created_at}</td>
                                    <td>{tag.updated_at}</td>
                                    <td>
                                        <ButtonDiv>
                                            <Link to={`/admin/tag/${tag.id}`}>
                                                <Button>
                                                    <MdEditSquare size={20}/>
                                                </Button>
                                            </Link>
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
                        <Link to={`/admin/tag`}>
                            <Button>ADICIONAR NOVO</Button>
                        </Link>
                    </ButtonContainer>
                </Container>
            </Content>
        </AdminContainer>
    );

}

export default Tags;