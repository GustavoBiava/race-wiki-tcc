import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { FaTrashAlt } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AdminContainer, Table, Button } from '../../../styles/GlobalStyles';
import axios from '../../../services/axios';
import { AdminContext } from '../../../contexts/AdminContext';
import { 
    TitleHeader,
    Container,
    ButtonDiv,
    ButtonContainer,
    Content,
} from './styled';


function Drivers() {

    const [drivers, setDrivers] = useState([]);
    const navigate = useNavigate();
    const { isLogged, user } = useSelector(states => states.auth);
    const { mode, unsetAdmin, setAdmin } = useContext(AdminContext);

    const handleDeleteClick = (e) => {
        const id = e.currentTarget.parentNode.parentNode.id;
        try {
            (async function() {
                await axios.delete(`/drivers/${id}`);
            })();
            return toast.success('Piloto deletado com sucesso!'); 
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
                const response = await axios.get('/drivers');
                return setDrivers(response.data);
            })();
        }
        catch (err) {
            const errors = get(err, 'response.data.errors', []);
            return errors.map(e => toast.error(e));
        }
    }, [drivers]);

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
                                <tr key={index} id={driver.id}>
                                    <td>{driver.id}</td>
                                    <td>{driver.name}</td>
                                    <td>{driver.surname}</td>
                                    <td>{driver.short_name}</td>
                                    <td>{get(driver, 'country.name')}</td>
                                    <td>{driver.created_at}</td>
                                    <td>{driver.updated_at}</td>
                                    <td>
                                        <ButtonDiv>
                                            <Link to={`/admin/piloto/${driver.id}`}>
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
                        <Link to='/admin/piloto'>
                            <Button>ADICIONAR NOVO</Button>
                        </Link>
                    </ButtonContainer>
                </Container>
            </Content>
        </AdminContainer>
    );

}

export default Drivers;