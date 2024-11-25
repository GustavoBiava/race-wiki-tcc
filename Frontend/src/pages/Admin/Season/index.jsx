import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { isInt } from 'validator';

import { AdminContainer, Button } from '../../../styles/GlobalStyles';
import axios from '../../../services/axios';

import { 
    Content,
    Form,
    FormBody,
    FormButton,
    TitleHeader,
} from './styled';
import { useSelector } from 'react-redux';
import { AdminContext } from '../../../contexts/AdminContext';

function Season() {

    const { id } = useParams();
    
    const navigate = useNavigate();
    const { isLogged, user } = useSelector(states => states.auth);
    const { mode, unsetAdmin, setAdmin } = useContext(AdminContext);

    const [year, setYear] = useState('');

    const handleButtonClick = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        if (!id) {
            (async function() {
                try {
                    await axios.post(`/seasons`, { year });
                    navigate('/admin/temporadas');
                    return toast.success('Temporada criada com sucesso!'); 
                }
                catch {
                    navigate('/admin/temporadas');
                    return toast.error('Temporada já existe!')
                }
            })();
            return;
        }

        (async function() {
            try {
                await axios.put(`/seasons/${id}`, { year });
                navigate('/admin/temporadas');
            return toast.success('Temporada atualizada com sucesso!'); 
            }
            catch {
                navigate('/admin/temporadas');
                return toast.error('Temporada já existe!')
            }
        })();
    }

    useEffect(() => {
        if (!isLogged) return navigate('/');
        if (user.type !== 'ADMIN') return navigate('/');
        if (mode !== 'admin') setAdmin();
        if (!id) return;

        try {
            (async function() {
                const response = await axios.get(`/seasons/${id}`);
                if (response.status === 204) {
                    navigate('/admin/circuitos');
                    return toast.error('Essa temporada não existe!');
                }
                setYear(get(response.data, 'year'));
            })();
        }
        catch(err) {
            const errors = get(err, 'response.data.errors', []);
            return errors.map(e => toast.error(e));
        }
    }, [id]);

    function validateForm() {
        if (!year) {
            toast.error('Ano inválido!');
            return false;
        }

        if (!isInt(String(year))) {
            toast.error('Ano precisa ser um número inteiro!');
            return false;
        }

        if (year.length <= 3 || year.length > 4) {
            toast.error('Ano tamanho inválido! (Min: 3, Max: 4)');
            return false;
        }

        return true;
    }

    return (
        <AdminContainer>
            <Content>
                <TitleHeader>
                    <h1>{ id ? ('EDITAR TEMPORADA') : ('ADICIONAR TEMPORADA')}</h1>
                    <hr />
                </TitleHeader>

                <Form>
                    <FormBody>
                        <label htmlFor="name">Ano da temporada:</label>
                        <input type="number" placeholder='Digite aqui o ano da temporada...' value={year} onChange={(e) => setYear(e.target.value)}/>
                    </FormBody>

                    <FormButton>
                        <Button onClick={handleButtonClick}>{ id ? ('EDITAR') : ('SALVAR')}</Button>
                    </FormButton>
                </Form>
            </Content>
        </AdminContainer>
    );

}

export default Season;