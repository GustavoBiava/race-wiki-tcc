import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import Select from '../../../components/Select';

import { AdminContainer, Button } from '../../../styles/GlobalStyles';
import axios from '../../../services/axios';

import { 
    Content,
    Form,
    FormBody,
    FormButton,
    TitleHeader,
} from './styled';

function Tag() {

    const { id } = useParams();
    
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [selected, setSelected] = useState('');

    const handleButtonClick = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        try {
            if (!id) {
                (async function() {
                    await axios.post(`/tags`, { 
                        tag_name: name,
                        type: (selected === 'Piloto' ? 'DRIVER' : 'TEAM'),
                    });
                })();
                navigate('/admin/tags');
                return toast.success('Tag criada com sucesso!'); 
            }

            (async function() {
                await axios.put(`/tags/${id}`, {
                    tag_name: name,
                    type: (selected === 'Piloto' ? 'DRIVER' : 'TEAM'),
                });
            })();
            navigate('/admin/tags');
            return toast.success('Tag atualizada com sucesso!'); 
        }
        catch(err) {
            const errors = get(err, 'response.data.errors', []);
            return errors.map(e => toast.error(e));
        }
    }

    useEffect(() => {
        if (!id) return;

        try {
            (async function() {
                const {data, status} = await axios.get(`/tags/${id}`);
                if (status === 204) {
                    navigate('/admin/tags');
                    return toast.error('Essa tag não existe!');
                }
                setName(get(data, 'tag_name'));
                setSelected(get(data, 'type') === 'DRIVER' ? 'Piloto' : 'Equipe')
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

        if (name.length < 3 || name.length > 40) {
            toast.error('Nome deve possuir entre 3 e 40 caracteres!');
            return false;
        }

        if (!selected) {
            toast.error('Tipo inválido!');
            return false;
        }

        return true;
    }

    return (
        <AdminContainer>
            <Content>
                <TitleHeader>
                    <h1>{ id ? ('EDITAR TAG') : ('ADICIONAR TAG')}</h1>
                    <hr />
                </TitleHeader>

                <Form>
                    <FormBody>
                        <label htmlFor="name">Nome da tag:</label>
                        <input type="text" placeholder='Digite aqui o nome da tag...' value={name} onChange={(e) => setName(e.target.value)}/>

                        <label htmlFor="type">Tipo da tag:</label>
                        <Select selected={selected} setSelected={setSelected} options={['Piloto', 'Equipe']}/>
                    </FormBody>

                    <FormButton>
                        <Button onClick={handleButtonClick}>{ id ? ('EDITAR') : ('SALVAR')}</Button>
                    </FormButton>
                </Form>
            </Content>
        </AdminContainer>
    );

}

export default Tag;