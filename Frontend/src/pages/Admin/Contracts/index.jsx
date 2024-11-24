import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { FaTrashAlt } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';

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

function Contracts() {

    const [contracts, setContracts] = useState([]);
    const navigate = useNavigate();
    const { isLogged, user } = useSelector(states => states.auth);

    const handleDeleteClick = (e) => {
        const id = e.currentTarget.parentNode.parentNode.id;
        try {
            (async function() {
                await axios.delete(`/careerContracts/${id}`);
            })();
            return toast.success('Contrato deletado com sucesso!'); 
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
                const response = await axios.get('/careerContracts');
                return setContracts(response.data);
            })();
        }
        catch (err) {
            const errors = get(err, 'response.data.errors', []);
            return errors.map(e => toast.error(e));
        }
    }, [contracts]);

    return (
        <AdminContainer>
             <Content>
                <TitleHeader>
                        <h1>CONTRATOS</h1>
                        <hr />
                </TitleHeader>

                <Container>
                    <Table>
                        <tr>
                            <th>ID</th>
                            <th>Piloto</th>
                            <th>Equipe</th>
                            <th>Ativo</th>
                            <th>Criado em</th>
                            <th>Editado em</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                        { contracts ? (
                            contracts.map((contract, index) => (
                                <tr key={index} id={contract.id}>
                                    <td>{contract.id}</td>
                                    <td>{get(contract, 'Driver.name')} {get(contract, 'Driver.surname')}</td>
                                    <td>{get(contract, 'Team.name')}</td>
                                    <td>{contract.is_active ? 'Sim' : 'Não'}</td>
                                    <td>{contract.created_at}</td>
                                    <td>{contract.updated_at}</td>
                                    <td>
                                        <ButtonDiv>
                                            <Link to={`/admin/contrato/${contract.id}`}>
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
                        <Link to='/admin/contrato'>
                            <Button>ADICIONAR NOVO</Button>
                        </Link>
                    </ButtonContainer>
                </Container>
            </Content>
        </AdminContainer>
    );

}

export default Contracts;