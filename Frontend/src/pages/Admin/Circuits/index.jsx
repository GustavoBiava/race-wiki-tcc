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

function Circuits() {

    const [circuits, setCircuits] = useState([]);
    const navigate = useNavigate();
    const { isLogged, user } = useSelector(states => states.auth);

    const handleDeleteClick = (e) => {
        const id = e.currentTarget.parentNode.parentNode.id;
        try {
            (async function() {
                await axios.delete(`/circuits/${id}`);
            })();
            return toast.success('Circuito deletado com sucesso!'); 
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
                const response = await axios.get('/circuits');
                return setCircuits(response.data);
            })();
        }
        catch (err) {
            const errors = get(err, 'response.data.errors', []);
            return errors.map(e => toast.error(e));
        }
    }, [circuits]);

    return (
        <AdminContainer>
             <Content>
                <TitleHeader>
                        <h1>CIRCUITOS</h1>
                        <hr />
                </TitleHeader>

                <Container>
                    <Table>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Primeira Aparição</th>
                            <th>Tamanho do Circuito</th>
                            <th>Criado em</th>
                            <th>Editado em</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                        { circuits ? (
                            circuits.map((circuit, index) => (
                                <tr key={index} id={circuit.id}>
                                    <td>{circuit.id}</td>
                                    <td>{circuit.name}</td>
                                    <td>{circuit.first_apparition}</td>
                                    <td>{circuit.circuit_length}</td>
                                    <td>{circuit.created_at}</td>
                                    <td>{circuit.updated_at}</td>
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

export default Circuits;