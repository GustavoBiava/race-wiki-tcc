import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import Select from '../../../components/Select';
import { FaFileUpload } from 'react-icons/fa';

import { AdminContainer, Button } from '../../../styles/GlobalStyles';
import axios from '../../../services/axios';

import { 
    CommentTextarea,
    Content,
    Form,
    FormBody,
    FormButton,
    ImageDiv,
    ImageInput,
    SelectImage,
    TitleHeader,
} from './styled';

function Driver() {

    const { id } = useParams();
    
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [height, setHeight] = useState('');
    const [shortName, setShortName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [description, setDescription] = useState('');
    const [selected, setSelected] = useState('');
    const [countries, setCountries] = useState([]);
    const [image, setImage] = useState();

    const [stats, setStats] = useState(0);
    const [number, setNumber] = useState(0);
    const [driverChampionships, setDriverChampionships] = useState(0);
    const [races, setRaces] = useState(0);
    const [victories, setVictories] = useState(0);
    const [podiums, setPodiums] = useState(0);
    const [points, setPoints] = useState(0);
    const [bestGridPosition, setBestGridPosition] = useState(0);
    const [bestRacePosition, setBestRacePosition] = useState(0);
    const [timesBestFinish, setTimesBestFinish] = useState(0);

    const handleButtonClick = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        try {
            if (!id) {
                (async function() {
                    await axios.post(`/drivers`, { 
                        name,
                        surname,
                        description,
                        height,
                        birth_date: birthDate,
                        short_name: shortName,
                        nationality: countries.filter(country => country.name === selected)[0].id,
                    });
                })();
                navigate('/admin/pilotos');
                return toast.success('Piloto criado com sucesso!'); 
            }

            (async function() {
                await axios.put(`/drivers/${id}`, {
                    name,
                    surname,
                    description,
                    height,
                    birth_date: birthDate,
                    short_name: shortName,
                    nationality: countries.filter(country => country.name === selected)[0].id,
                });
            })();

            if (!stats) {
                (async function() {
                    await axios.post(`/driverStats`, {
                        number,
                        races_entered: races,
                        drivers_championships: driverChampionships,
                        victories,
                        podiums,
                        career_points: points,
                        highest_grid_position: bestGridPosition,
                        highest_race_finish: bestRacePosition,
                        times_highest_finish: timesBestFinish,
                        driver_id: id
                    });
                })();
            }

            (async function() {
                await axios.put(`/driverStats/${stats}`, {
                    number,
                    races_entered: races,
                    drivers_championships: driverChampionships,
                    victories,
                    podiums,
                    career_points: points,
                    highest_grid_position: bestGridPosition,
                    highest_race_finish: bestRacePosition,
                    times_highest_finish: timesBestFinish,
                    driver_id: id
                });
            })();
            navigate('/admin/pilotos');
            return toast.success('Piloto atualizado com sucesso!'); 
        }
        catch(err) {
            const errors = get(err, 'response.data.errors', []);
            return errors.map(e => toast.error(e));
        }
    }

    useEffect(() => {
        (async function teste() {
            const response = await axios.get(`/countries`);
            const data = get(response, 'data');
            setCountries(data.map((country) => {
                return {
                    id: country.id,
                    name: country.name,
                }
            }));
        })();
    }, []);

    useEffect(() => {
        if (!id) return;

        try {
            (async function() {
                const {data, status} = await axios.get(`/drivers/${id}`);
                if (status === 204) {
                    navigate('/admin/pilotos');
                    return toast.error('Esse piloto não existe!');
                }

                const { name: countryName } = countries.filter(country => country.id === get(data, 'nationality'))[0];

                setName(get(data, 'name'));
                setSurname(get(data, 'surname'));
                setDescription(get(data, 'description'));
                setHeight(get(data, 'height'));
                setBirthDate(get(data, 'birth_date'));
                setShortName(get(data, 'short_name'));
                setSelected(countryName);
                setImage(get(data, 'driver_picture.url', ''));
                return;
            })();    
            
            (async function() {
                const { status, data } = await axios.get(`/driverStats/driver/${id}`);
                if (status === 204) return setStats(0);

                setNumber(get(data, 'number'));
                setRaces(get(data, 'races_entered'));
                setDriverChampionships(get(data, 'drivers_championships'));
                setVictories(get(data, 'victories'));
                setPodiums(get(data, 'podiums'));
                setPoints(get(data, 'career_points'));
                setBestGridPosition(get(data, 'highest_grid_position'));
                setBestRacePosition(get(data, 'highest_race_finish'));
                setTimesBestFinish(get(data, 'times_highest_finish'));
                return setStats(get(data, 'id'));

            })();

        }
        catch(err) {
            const errors = get(err, 'response.data.errors', []);
            return errors.map(e => toast.error(e));
        }
    }, [countries, id, navigate]);

    const handleInputChange = async (e) => {
        const file = e.target.files[0];
        const fileURL = URL.createObjectURL(file);
    
        setImage(fileURL);
    
        const formData = new FormData();
        formData.append('driver_id', id);
        formData.append('archive', file);
    
        if (!image) {
            try {
                await axios.post('/pictures/drivers', formData, {
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
            await axios.put('/pictures/drivers', formData, {
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

    function validateForm() {
        if (!name) {
            toast.error('Nome inválido!');
            return false;
        }

        if (name.length < 3 || name.length > 50) {
            toast.error('Nome deve possuir entre 3 e 40 caracteres!');
            return false;
        }

        if (!surname) {
            toast.error('Sobrenome inválido!');
            return false;
        }

        if (surname.length < 3 || surname.length > 50) {
            toast.error('Sobrenome deve possuir entre 3 e 40 caracteres!');
            return false;
        }

        if (!height) {
            toast.error('Altura inválido!');
            return false;
        }

        if (!birthDate) {
            toast.error('Data de nascimento inválida!');
            return false;
        }

        if (!shortName) {
            toast.error('Nome curto inválido!');
            return false;
        }

        if (!selected) {
            toast.error('Nacionalidade inválida!');
            return false;
        }
        return true;
    }

    return (
        <AdminContainer>
            <Content>
                <TitleHeader>
                    <h1>{ id ? ('EDITAR PILOTO') : ('ADICIONAR PILOTO')}</h1>
                    <hr />
                </TitleHeader>

                <Form>
                    <FormBody>
                        <label htmlFor="name">Nome do piloto:</label>
                        <input type="text" placeholder='Digite aqui o nome do piloto...' value={name} onChange={(e) => setName(e.target.value)}/>
                        
                        <label htmlFor="surname">Sobrenome do piloto:</label>
                        <input type="text" placeholder='Digite aqui o sobrenome do piloto...' value={surname} onChange={(e) => setSurname(e.target.value)}/>
                        
                        <label htmlFor="height">Altura do piloto:</label>
                        <input type="number" placeholder='Digite aqui a altura do piloto...' value={height} onChange={(e) => setHeight(e.target.value)} step='0.1'/>
                        
                        <label htmlFor="birth_date">Data de nascimento do piloto:</label>
                        <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)}/>

                        <label htmlFor="short_name">Nome curto do piloto:</label>
                        <input type="text" placeholder='Digite aqui o nome curto do piloto...' value={shortName} onChange={(e) => setShortName(e.target.value)}/>

                        <label htmlFor="description">Descrição do piloto:</label>
                        <CommentTextarea placeholder='Digite aqui a descrição do piloto...' value={description} onChange={(e) => setDescription(e.target.value)}/>

                        { id ? (
                            <>
                                <label htmlFor="number">Número do piloto:</label>
                                <input type="number" placeholder='Digite aqui o número do piloto...' value={number} onChange={(e) => setNumber(e.target.value)} step='1'/>
                                
                                <label htmlFor="driver_championships">Número de títulos do piloto:</label>
                                <input type="number" placeholder='Digite aqui o número de títulos do piloto...' value={driverChampionships} onChange={(e) => setDriverChampionships(e.target.value)} step='1'/>
                                
                                <label htmlFor="races">Número de corridas do piloto:</label>
                                <input type="number" placeholder='Digite aqui o número de corridas do piloto...' value={races} onChange={(e) => setRaces(e.target.value)} step='1'/>
                               
                                <label htmlFor="victories">Número de vitórias do piloto:</label>
                                <input type="number" placeholder='Digite aqui o número de vitórias do piloto...' value={victories} onChange={(e) => setVictories(e.target.value)} step='1'/>

                                <label htmlFor="podiums">Número de pódios do piloto:</label>
                                <input type="number" placeholder='Digite aqui o número de pódios do piloto...' value={podiums} onChange={(e) => setPodiums(e.target.value)} step='1'/>
                            
                                <label htmlFor="points">Pontos do piloto:</label>
                                <input type="number" placeholder='Digite aqui os pontos do piloto...' value={points} onChange={(e) => setPoints(e.target.value)} step='0.1'/>
                                
                                <label htmlFor="best_grid_position">Melhor posição de largada do piloto:</label>
                                <input type="number" placeholder='Digite aqui a melhor posição de largada do piloto...' value={bestGridPosition} onChange={(e) => setBestGridPosition(e.target.value)} step='1'/>
                                
                                <label htmlFor="best_race_position">Melhor posição de chegada do piloto:</label>
                                <input type="number" placeholder='Digite aqui a melhor posição de chegada do piloto...' value={bestRacePosition} onChange={(e) => setBestRacePosition(e.target.value)} step='1'/>
                                
                                <label htmlFor="times_best_finish">Quantidade de melhores posições de chegada do piloto:</label>
                                <input type="number" placeholder='Digite aqui a quantidade de melhores posições de chegada do piloto...' value={timesBestFinish} onChange={(e) => setTimesBestFinish(e.target.value)} step='1'/>

                                <label>Imagem do piloto:</label>
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

                        <label htmlFor="type">Nacionalidade do piloto:</label>
                        <Select selected={selected} setSelected={setSelected} options={countries.map(country => country.name)}/>
                    </FormBody>

                    <FormButton>
                        <Button onClick={handleButtonClick}>{ id ? ('EDITAR') : ('SALVAR')}</Button>
                    </FormButton>
                </Form>
            </Content>
        </AdminContainer>
    );

}

export default Driver;