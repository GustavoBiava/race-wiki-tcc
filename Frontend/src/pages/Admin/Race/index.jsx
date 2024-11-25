import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { FaFileUpload } from "react-icons/fa";
import { useSelector } from 'react-redux';
import Select from '../../../components/Select';

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

function Race() {

    const { id } = useParams();
    
    const navigate = useNavigate();
    const { user } = useSelector(states => states.auth);

    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [laps, setLaps] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [raceDistance, setRaceDistance] = useState(0);
    const [selectedCircuit, setSelectedCircuit] = useState('');
    const [selectedSeason, setSelectedSeason] = useState('');
    const [selectedPlace, setSelectedPlace] = useState('');
    const [image, setImage] = useState('');

    const [circuits, setCircuits] = useState([]);
    const [seasons, setSeasons] = useState([]);
    const [countries, setCountries] = useState([]);

    const handleButtonClick = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        try {
            if (!id) {
                (async function() {
                    await axios.post(`/races`, { 
                        name,
                        date,
                        laps_quantity: laps,
                        type: selectedType,
                        race_distance: raceDistance,
                        circuit_id: circuits.filter(circuit => circuit.name === selectedCircuit)[0].id,
                        season_id: seasons.filter(season => season.year === selectedSeason)[0].id,
                        race_place: countries.filter(country => country.name === selectedPlace)[0].id,
                    });
                })();
                navigate('/admin/corridas');
                return toast.success('Corrida criada com sucesso!'); 
            }

            (async function() {
                await axios.put(`/races/${id}`, {
                    name,
                    date,
                    laps_quantity: laps,
                    type: selectedType,
                    race_distance: raceDistance,
                    circuit_id: circuits.filter(circuit => circuit.name === selectedCircuit)[0].id,
                    season_id: seasons.filter(season => season.year === selectedSeason)[0].id,
                    race_place: countries.filter(country => country.name === selectedPlace)[0].id,
                });
            })();
            navigate('/admin/corridas');
            return toast.success('Corrida atualizada com sucesso!'); 
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
            formData.append('race_id', id);
            formData.append('archives', files[i]);
    
            try {
                await axios.post('/pictures/races', formData, {
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
            const response = await axios.get(`/circuits`);
            const data = get(response, 'data');
            setCircuits(data.map((circuit) => {
                return {
                    id: circuit.id,
                    name: circuit.name,
                }
            }));
        })();
    }, []);

    useEffect(() => {
        (async function() {
            const response = await axios.get(`/seasons`);
            const data = get(response, 'data');
            setSeasons(data.map((season) => {
                return {
                    id: season.id,
                    year: season.year,
                }
            }));
        })();
    }, []);

    useEffect(() => {
        (async function() {
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
                const {data, status} = await axios.get(`/races/${id}`);
                if (status === 204) {
                    navigate('/admin/corridas');
                    return toast.error('Essa corrida não existe!');
                }

                const { name: circuitName } = circuits.filter(circuit => circuit.id === get(data, 'circuit_id'))[0];
                const { year: seasonYear } = seasons.filter(season => season.id === get(data, 'season_id'))[0];
                const { name: placeName } = countries.filter(country => country.id === get(data, 'race_place'))[0];

                setName(get(data, 'name'));
                setDate(get(data, 'date'));
                setSelectedType(get(data, 'type'))
                setLaps(get(data, 'laps_quantity'))
                setRaceDistance(get(data, 'race_distance'));
                setSelectedCircuit(circuitName);
                setSelectedSeason(seasonYear);
                setSelectedPlace(placeName);
                setImage(get(data, 'race_picture[0].url'));
            })();
        }
        catch(err) {
            const errors = get(err, 'response.data.errors', []);
            return errors.map(e => toast.error(e));
        }
    }, [id, countries, seasons, circuits]);

    function validateForm() {
        if (!name) {
            toast.error('Nome inválido!');
            return false;
        }

        if (!date) {
            toast.error('Data inválida!');
            return false;
        }

        if (!laps) {
            toast.error('Quantidade de voltas inválida!');
            return false;
        }

        if (!selectedType) {
            toast.error('Tipo inválido!');
            return false;
        }

        if (!raceDistance) {
            toast.error('Distância inválida!');
            return false;
        }

        if (!selectedCircuit) {
            toast.error('Circuito inválido!');
            return false;
        }

        if (!selectedSeason) {
            toast.error('Temporada inválida!');
            return false;
        }

        if (!selectedPlace) {
            toast.error('País inválido!');
            return false;
        }

        return true;
    }

    return (
        <AdminContainer>
            <Content>
                <TitleHeader>
                    <h1>{ id ? ('EDITAR CORRIDA') : ('ADICIONAR CORRIDA')}</h1>
                    <hr />
                </TitleHeader>

                <Form>
                    <FormBody>
                        <label htmlFor="name">Nome da corrida:</label>
                        <input type="text" placeholder='Digite aqui o nome da corrida...' value={name} onChange={(e) => setName(e.target.value)}/>
                        
                        <label htmlFor="date">Data da corrida:</label>
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)}/>

                        <label htmlFor="date">Quantidade de voltas na corrida:</label>
                        <input type="number" value={laps} onChange={(e) => setLaps(e.target.value)}/>

                        <label htmlFor="distance">Distância da corrida:</label>
                        <input type="number" value={raceDistance} onChange={(e) => setRaceDistance(e.target.value)} step='0.1'/>

                        <label htmlFor="type">Tipo da corrida:</label>
                        <Select setSelected={setSelectedType} selected={selectedType} options={['NORMAL', 'SPRINT']}/>

                        <label htmlFor="circuit">Circuito da corrida:</label>
                        <Select setSelected={setSelectedCircuit} selected={selectedCircuit} options={circuits.map(circuit => circuit.name)}/>
                        
                        <label htmlFor="season">Temporada da corrida:</label>
                        <Select setSelected={setSelectedSeason} selected={selectedSeason} options={seasons.map(season => season.year)}/>

                        <label htmlFor="place">País da corrida:</label>
                        <Select setSelected={setSelectedPlace} selected={selectedPlace} options={countries.map(country => country.name)}/>
                        
                        
                        { id ? (
                            <>
                                <label>Imagens da corrida:</label>
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

export default Race;