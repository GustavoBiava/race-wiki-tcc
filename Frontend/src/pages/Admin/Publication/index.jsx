import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { FaFileUpload } from "react-icons/fa";
import { useSelector } from 'react-redux';
import Select from '../../../components/Select';

import { AdminContainer, Button } from '../../../styles/GlobalStyles';
import axios from '../../../services/axios';
import { AdminContext } from '../../../contexts/AdminContext';

import { 
    Content,
    Form,
    FormBody,
    FormButton,
    TitleHeader,
    ImageInput,
    SelectImage,
    ImageDiv,
    CommentTextarea,
} from './styled';

function Country() {

    const { id } = useParams();
    
    const navigate = useNavigate();
    const { isLogged, user } = useSelector(states => states.auth);
    const { mode, unsetAdmin, setAdmin } = useContext(AdminContext);

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState([]);
    const [selected, setSelected] = useState();
    const [tags, setTags] = useState([]);

    const handleButtonClick = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        try {
            if (!id) {
                (async function() {
                    await axios.post(`/publications`, { 
                        title,
                        body,
                        author: user.id
                    });
                })();
                navigate('/admin/publicacoes');
                return toast.success('Publicação criada com sucesso!'); 
            }

            (async function() {
                await axios.put(`/publications/${id}`, {
                    title,
                    body,
                    author: user.id
                });
            })();

            if (selected) {
                const tag = tags.filter(tag => tag.name === selected)[0];

                (async function() {
                    await axios.post(`/tagsPublications`, {
                        tag_id: tag.id,
                        publication_id: id
                    });
                })();
            }

            navigate('/admin/publicacoes');
            return toast.success('Publicação atualizada com sucesso!'); 
        }
        catch(err) {
            const errors = get(err, 'response.data.errors', []);
            return errors.map(e => toast.error(e));
        }
    }

    const handleInputChange = async (e) => {
        const files = e.target.files;

        for (const i in files) {
            const fileURL = URL.createObjectURL(files[i]);

            setImage(fileURL);

            const formData = new FormData();
            formData.append('publication_id', id);
            formData.append('archives', files[i]);
    
            try {
                await axios.post('/pictures/publications', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
                });
                toast.success('Foto enviada com sucesso!');
            }
            catch {
                toast.error('Foto enviada sem sucesso!');
            }
        }
    };

    useEffect(() => {

        (async function() {
            const response = await axios.get(`/tags`);
            const data = get(response, 'data');
            setTags(data.map((tag) => {
                return {
                    id: tag.id,
                    name: tag.tag_name,
                }
            }));
        })();

        if (!isLogged) return navigate('/');
        if (user.type !== 'ADMIN') return navigate('/');
        if (mode !== 'admin') setAdmin();

        if (!id) return;

        try {
            (async function() {
                const {data, status} = await axios.get(`/publications/${id}`);
                if (status === 204) {
                    navigate('/admin/publicacoes');
                    return toast.error('Essa publicação não existe!');
                }
                setTitle(get(data, 'title'));
                setBody(get(data, 'body'));
                setImage(get(data, 'publication_picture[0].url'));
            })();
        }
        catch(err) {
            const errors = get(err, 'response.data.errors', []);
            return errors.map(e => toast.error(e));
        }
    }, [id]);

    function validateForm() {
        if (!title) {
            toast.error('Título inválido!');
            return false;
        }

        if (title.length < 4 || title.length > 70) {
            toast.error('Título deve possuir entre 4 e 70 caracteres!');
            return false;
        }

        if (!body) {
            toast.error('Corpo da publicação não pode ser vazio!');
            return false;
        }

        return true;
    }

    return (
        <AdminContainer>
            <Content>
                <TitleHeader>
                    <h1>{ id ? ('EDITAR PUBLICAÇÃO') : ('ADICIONAR PUBLICAÇÃO')}</h1>
                    <hr />
                </TitleHeader>

                <Form>
                    <FormBody>
                        <label htmlFor="title">Título da publicação:</label>
                        <input type="text" placeholder='Digite aqui o título da publicação...' value={title} onChange={(e) => setTitle(e.target.value)}/>
                        
                        <label htmlFor="short_name">Corpo da publicação:</label>
                        <CommentTextarea placeholder='Digite aqui o corpo da publicação...' value={body} onChange={(e) => setBody(e.target.value)}/>

                        { id ? (
                            <>
                                <label>Imagens da publicação:</label>
                                <ImageInput htmlFor='image'>
                                { image ? (
                                    <ImageDiv>
                                        <img src={image} alt="publicaiton-image" />
                                    </ImageDiv>
                                ) : (
                                    <SelectImage>
                                        <FaFileUpload size={16} />
                                        <p>Selecionar Imagem...</p>
                                    </SelectImage>
                                )}
                                <input type="file" id='image' onChange={handleInputChange} multiple />
                                </ImageInput>

                                <label htmlFor="tags">Adicionar tags na publicação:</label>
                                <Select selected={selected} setSelected={setSelected} options={tags.map((tag) => tag.name)}/>

                            </>
                        ) : ''}
                    </FormBody>

                    <FormButton>
                        <Button onClick={handleButtonClick}>{ id ? ('EDITAR') : ('SALVAR')}</Button>
                    </FormButton>
                </Form>
            </Content>
        </AdminContainer>
    );

}

export default Country;