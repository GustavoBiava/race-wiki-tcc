import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { FaFileUpload } from "react-icons/fa";
import Cropper, {  } from 'react-easy-crop';

import { AdminContainer, Button } from '../../../styles/GlobalStyles';
import axios from '../../../services/axios';

import { 
    Content,
    Form,
    FormBody,
    FormButton,
    TitleHeader,
    ImageInput,
    SelectImage,
    ImageDiv,
} from './styled';
import { useSelector } from 'react-redux';
import { AdminContext } from '../../../contexts/AdminContext';

function Country() {

    const { id } = useParams();
    
    const navigate = useNavigate();
    const { isLogged, user } = useSelector(states => states.auth);
    const { mode, unsetAdmin, setAdmin } = useContext(AdminContext);

    const [name, setName] = useState('');
    const [shortName, setShortName] = useState('');
    const [image, setImage] = useState('');

    const handleButtonClick = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        try {
            if (!id) {
                (async function() {
                    await axios.post(`/countries`, { 
                        name,
                        iso3: shortName
                    });
                })();
                navigate('/admin/paises');
                return toast.success('País criado com sucesso!'); 
            }

            (async function() {
                await axios.put(`/countries/${id}`, {
                    name,
                    iso3: shortName
                });
            })();
            navigate('/admin/paises');
            return toast.success('País atualizado com sucesso!'); 
        }
        catch(err) {
            const errors = get(err, 'response.data.errors', []);
            return errors.map(e => toast.error(e));
        }
    }

    const handleInputChange = async (e) => {
        const file = e.target.files[0];
        const fileURL = URL.createObjectURL(file);
    
        setImage(fileURL);
    
        const formData = new FormData();
        formData.append('country_id', id);
        formData.append('archive', file);
    
        if (!image) {
            try {
                await axios.post('/pictures/countries', formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  }
                });
                return toast.success('Foto enviada com sucesso!');
            }
            catch {
                return toast.error('Foto enviada sem sucesso!');
            }
        }

        try {
            await axios.put('/pictures/countries', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              }
            });
            return toast.success('Foto enviada com sucesso!');
        }
        catch {
            return toast.error('Foto enviada sem sucesso!');
        }
      };

    useEffect(() => {
        if (!isLogged) return navigate('/');
        if (user.type !== 'ADMIN') return navigate('/');
        if (mode !== 'admin') setAdmin();
        if (!id) return;

        try {
            (async function() {
                const {data, status} = await axios.get(`/countries/${id}`);
                if (status === 204) {
                    navigate('/admin/paises');
                    return toast.error('Esse país não existe!');
                }
                setName(get(data, 'name'));
                setShortName(get(data, 'iso3'));
                setImage(get(data, 'country_picture.url'));
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

        if (!shortName) {
            toast.error('Nome curto inválido!');
            return false;
        }

        if (shortName.length < 1 || shortName.length > 3) {
            toast.error('Nome curto deve possuir entre 1 e 3 caracteres!');
            return false;
        }

        return true;
    }

    return (
        <AdminContainer>
            <Content>
                <TitleHeader>
                    <h1>{ id ? ('EDITAR PAÍS') : ('ADICIONAR PAÍS')}</h1>
                    <hr />
                </TitleHeader>

                <Form>
                    <FormBody>
                        <label htmlFor="name">Nome do país:</label>
                        <input type="text" placeholder='Digite aqui o nome do pais...' value={name} onChange={(e) => setName(e.target.value)}/>
                        
                        <label htmlFor="short_name">Nome curto do país:</label>
                        <input type="text" placeholder='Digite aqui o nome curto do pais...' value={shortName} onChange={(e) => setShortName(e.target.value)}/>

                        
                        { id ? (
                            <>
                                <label>Imagem do país:</label>
                                <ImageInput htmlFor='image'>
                                { image ? (
                                    <ImageDiv>
                                        <img src={image} alt="country-image" />
                                    </ImageDiv>
                                ) : (
                                    <SelectImage>
                                        <FaFileUpload size={16} />
                                        <p>Selecionar Imagem...</p>
                                    </SelectImage>
                                )}
                                <input type="file" id='image' onChange={handleInputChange}/>
                                </ImageInput>
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