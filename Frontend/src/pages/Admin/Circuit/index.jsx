import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { isFloat, isDate } from 'validator';
import { useSelector } from 'react-redux';
import { AdminContext } from '../../../contexts/AdminContext';
import NotAllowed from '../../../components/NotAllowed';

import { AdminContainer, Button } from '../../../styles/GlobalStyles';
import axios from '../../../services/axios';

import { 
    Content,
    Form,
    FormBody,
    FormButton,
    TitleHeader,
} from './styled';


function Circuit() {

    const { id } = useParams();
    
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [length, setLength] = useState('');
    const [firstApparition, setFirstApparition] = useState('');
    const { isLogged, user } = useSelector(states => states.auth);
    const { mode, unsetAdmin, setAdmin } = useContext(AdminContext);

    const handleButtonClick = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        try {
            if (!id) {
                (async function() {
                    await axios.post(`/circuits`, {
                        name,
                        circuit_length: length,
                        first_apparition: firstApparition,
                    });
                })();
                navigate('/admin/circuitos');
                return toast.success('Circuito criado com sucesso!'); 
            }

            (async function() {
                await axios.put(`/circuits/${id}`, {
                    name,
                    circuit_length: length,
                    first_apparition: firstApparition,
                });
            })();
            navigate('/admin/circuitos');
            return toast.success('Circuito atualizado com sucesso!'); 
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
        if (!id) return;

        try {
            (async function() {
                const response = await axios.get(`/circuits/${id}`);
                if (response.status === 204) {
                    navigate('/admin/circuitos');
                    return toast.error('Esse circuito não existe!');
                }
                setName(get(response.data, 'name'));
                setLength(get(response.data, 'circuit_length'));
                setFirstApparition(get(response.data, 'first_apparition'));
            })();
        }
        catch(err) {
            const errors = get(err, 'response.data.errors', []);
            return errors.map(e => toast.error(e));
        }
    }, [id]);

    function validateForm() {
        if (!name) {
            toast.error('Nome inválido!');
            return false;
        }

        if (name.length < 3 || name.length > 50) {
            toast.error('Nome deve possuir entre 3 e 50 caracteres!');
            return false;
        }

        if (!length) {
            toast.error('Tamanho do circuito inválido!');
            return false;
        }

        if (!isFloat(String(length))) {
            toast.error('Tamanho do circuito deve ser um número de ponto flutuante!');
            return false;
        }

        if (!firstApparition || !isDate(firstApparition)) {
            toast.error('Data de primeira aparição inválida!');
            return false;
        }

        return true;
    }

    return (
        <AdminContainer>
            <Content>
                <TitleHeader>
                    <h1>{ id ? ('EDITAR CIRCUITO') : ('ADICIONAR CIRCUITO')}</h1>
                    <hr />
                </TitleHeader>

                <Form>
                    <FormBody>
                        <label htmlFor="name">Nome do circuito:</label>
                        <input type="text" placeholder='Digite aqui o nome do circuito...' value={name} onChange={(e) => setName(e.target.value)}/>

                        <label htmlFor="length">Tamanho do circuito:</label>
                        <input type="number" placeholder='Digite aqui o tamanho do circuito...' value={length} onChange={(e) => setLength(e.target.value)} step='0.1'/>

                        <label htmlFor="first_apparition">Primeira aparição:</label>
                        <input type="date" value={firstApparition} onChange={(e) => setFirstApparition(e.target.value)}/>
                    </FormBody>

                    <FormButton>
                        <Button onClick={handleButtonClick}>{ id ? ('EDITAR') : ('SALVAR')}</Button>
                    </FormButton>
                </Form>
            </Content>
        </AdminContainer>
    );

}

export default Circuit;