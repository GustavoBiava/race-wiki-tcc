import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { FaTrashAlt } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AdminContainer, Table, Button } from '../../../styles/GlobalStyles';
import axios from '../../../services/axios';
import { 
    TitleHeader,
    Container,
    ButtonDiv,
    ButtonContainer,
    Content,
} from './styled';


function Seasons() {
    const [seasons, setSeasons] = useState([]);
    const navigate = useNavigate();
    const { isLogged, user } = useSelector(states => states.auth);

    useEffect(() => {
        if (!isLogged) return navigate('/');
        if (user.type !== 'ADMIN') return navigate('/');
        try {
            (async function() {
                const response = await axios.get('/seasons');
                return setSeasons(response.data);
            })();
        }
        catch (err) {
            const errors = get(err, 'response.data.errors', []);
            return errors.map(e => toast.error(e));
        }
    }, []);

    return (
        <AdminContainer>
             <Content>
                <TitleHeader>
                        <h1>TEMPORADAS</h1>
                        <hr />
                </TitleHeader>

                <Container>
                    <Table>
                        <tr>
                            <th>ID</th>
                            <th>Ano</th>
                            <th>Criado em</th>
                            <th>Editado em</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                        { seasons ? (
                            seasons.map((season, index) => (
                                <tr key={index}>
                                    <td>{season.id}</td>
                                    <td>{season.year}</td>
                                    <td>{season.created_at}</td>
                                    <td>{season.updated_at}</td>
                                    <td>
                                        <ButtonDiv>
                                            <Button>
                                                <MdEditSquare size={20}/>
                                            </Button>
                                        </ButtonDiv>
                                    </td>
                                    <td>
                                        <ButtonDiv>
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

export default Seasons;