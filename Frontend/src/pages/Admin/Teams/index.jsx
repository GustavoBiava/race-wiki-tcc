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

function Teams() {

    const [teams, setTeams] = useState([]);

    useEffect(() => {
        try {
            (async function() {
                const response = await axios.get('/teams');
                return setTeams(response.data);
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
                        <h1>EQUIPES</h1>
                        <hr />
                </TitleHeader>

                <Container>
                    <Table>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Títulos</th>
                            <th>Nome Curto</th>
                            <th>Nacionalidade</th>
                            <th>Criado em</th>
                            <th>Editado em</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                        { teams ? (
                            teams.map((team, index) => (
                                <tr key={index}>
                                    <td>{team.id}</td>
                                    <td>{team.name}</td>
                                    <td>{team.constructors_championships}</td>
                                    <td>{team.short_name}</td>
                                    <td>{get(team, 'country.name')}</td>
                                    <td>{team.created_at}</td>
                                    <td>{team.updated_at}</td>
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

export default Teams;