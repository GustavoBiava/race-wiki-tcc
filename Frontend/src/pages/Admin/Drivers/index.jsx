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

function Drivers() {

    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        try {
            (async function() {
                const response = await axios.get('/drivers');
                return setDrivers(response.data);
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
                        <h1>PILOTOS</h1>
                        <hr />
                </TitleHeader>

                <Container>
                    <Table>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Sobrenome</th>
                            <th>Nome Curto</th>
                            <th>País</th>
                            <th>Criado em</th>
                            <th>Editado em</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                        { drivers ? (
                            drivers.map((driver, index) => (
                                <tr key={index}>
                                    <td>{driver.id}</td>
                                    <td>{driver.name}</td>
                                    <td>{driver.surname}</td>
                                    <td>{driver.short_name}</td>
                                    <td>{get(driver, 'country.name')}</td>
                                    <td>{driver.created_at}</td>
                                    <td>{driver.updated_at}</td>
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

export default Drivers;