import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { FaTrashAlt } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AdminContainer, Table, Button } from '../../../styles/GlobalStyles';
import axios from '../../../services/axios';
import { 
    TitleHeader,
    Container,
    ButtonDiv,
    ButtonContainer,
    Content,
} from './styled';
import { AdminContext } from '../../../contexts/AdminContext';


function Countries() {

    const [countries, setCountries] = useState([]);
    const navigate = useNavigate();
    const { isLogged, user } = useSelector(states => states.auth);
    const { mode, unsetAdmin, setAdmin } = useContext(AdminContext);


    const handleDeleteClick = (e) => {
        const id = e.currentTarget.parentNode.parentNode.id;
        try {
            (async function() {
                await axios.delete(`/countries/${id}`);
            })();
            return toast.success('País deletado com sucesso!'); 
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
                const response = await axios.get('/countries');
                return setCountries(response.data);
            })();
        }
        catch (err) {
            const errors = get(err, 'response.data.errors', []);
            return errors.map(e => toast.error(e));
        }
    }, [countries]);

    return (
        <AdminContainer>
             <Content>
                <TitleHeader>
                        <h1>PAÍSES</h1>
                        <hr />
                </TitleHeader>

                <Container>
                    <Table>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Nome Curto</th>
                            <th>Criado em</th>
                            <th>Editado em</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                        { countries ? (
                            countries.map((country, index) => (
                                <tr key={index} id={country.id}>
                                    <td>{country.id}</td>
                                    <td>{country.name}</td>
                                    <td>{country.iso3}</td>
                                    <td>{country.created_at}</td>
                                    <td>{country.updated_at}</td>
                                    <td>
                                        <ButtonDiv>
                                            <Link to={`/admin/pais/${country.id}`}>
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
                        <Link to={`/admin/pais`}>
                            <Button>ADICIONAR NOVO</Button>
                        </Link>
                    </ButtonContainer>
                </Container>
            </Content>
        </AdminContainer>
    );

}

export default Countries;