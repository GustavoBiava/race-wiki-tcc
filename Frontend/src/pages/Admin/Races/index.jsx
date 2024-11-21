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

function Races() {

    const [races, setRaces] = useState([]);

    useEffect(() => {
        try {
            (async function() {
                const response = await axios.get('/races');
                return setRaces(response.data);
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
                        <h1>CORRIDAS</h1>
                        <hr />
                </TitleHeader>

                <Container>
                    <Table>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>País</th>
                            <th>Voltas</th>
                            <th>Circuito</th>
                            <th>Temporada</th>
                            <th>Criado em</th>
                            <th>Editado em</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                        { races ? (
                            races.map((race, index) => (
                                <tr key={index}>
                                    <td>{race.id}</td>
                                    <td>{race.name}</td>
                                    <td>{get(race, 'place.name')}</td>
                                    <td>{race.laps_quantity}</td>
                                    <td>{get(race, 'circuit.name')}</td>
                                    <td>{get(race, 'season.year')}</td>
                                    <td>{race.created_at}</td>
                                    <td>{race.updated_at}</td>
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

export default Races;