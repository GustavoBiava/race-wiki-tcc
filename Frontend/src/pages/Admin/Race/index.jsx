import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
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
import { AdminContext } from '../../../contexts/AdminContext';

function Race() {

    const { id } = useParams();
    
    const navigate = useNavigate();
    const { isLogged, user } = useSelector(states => states.auth);
    const { mode, unsetAdmin, setAdmin } = useContext(AdminContext);

    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [laps, setLaps] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [raceDistance, setRaceDistance] = useState(0);
    const [selectedCircuit, setSelectedCircuit] = useState('');
    const [selectedSeason, setSelectedSeason] = useState('');
    const [selectedPlace, setSelectedPlace] = useState('');
    const [selectedDriver, setSelectedDriver] = useState('');
    const [image, setImage] = useState('');

    const [circuits, setCircuits] = useState([]);
    const [seasons, setSeasons] = useState([]);
    const [countries, setCountries] = useState([]);
    const [drivers, setDrivers] = useState([]);

    const [driverLaps, setDriverLaps] = useState(0);
    const [driverPoints, setDriverPoints] = useState(0);
    const [driverTotalTime, setDriverTotalTime] = useState('');
    const [driverInterval, setDriverInterval] = useState('');

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

            if (selectedDriver) {
                (async function() {
                    await axios.post(`/driverRaceResults`, { 
                        driver_id: drivers.filter(driver => `${driver.name} ${driver.surname}` === selectedDriver)[0].id,
                        race_id: id,
                        laps: driverLaps,
                        points: driverPoints,
                        total_race_duration: driverTotalTime,
                        interval_to_leader: driverInterval,
                    });
                })();

                (async function() {
                    const { data, status } = await axios.get(`/driverClassifications/driver/${drivers.filter(driver => `${driver.name} ${driver.surname}` === selectedDriver)[0].id}`);
                    if (status === 204) {
                        await axios.post(`/driverClassifications`, {
                            season_id: seasons.filter(season => season.year === selectedSeason)[0].id,
                            driver_id: drivers.filter(driver => `${driver.name} ${driver.surname}` === selectedDriver)[0].id,
                            points: driverPoints,
                        });
                        return;
                    }

                    const classificationId = get(data, 'id');
                    const classificationPoints = get(data, 'points');
                    
                    await axios.put(`/driverClassifications/${classificationId}`, {
                        season_id: seasons.filter(season => season.year === selectedSeason)[0].id,
                        driver_id: drivers.filter(driver => `${driver.name} ${driver.surname}` === selectedDriver)[0].id,
                        points: Number(classificationPoints) + Number(driverPoints),
                    });
                    return;
                })();
            }

            (async function() {
                const { data, status } = await axios.get(`/teamRaceResults/${id}/${drivers.filter(driver => `${driver.name} ${driver.surname}` === selectedDriver)[0].team}`);
                if (status === 204) {
                    await axios.post('/teamRaceResults', {
                        team_id: drivers.filter(driver => `${driver.name} ${driver.surname}` === selectedDriver)[0].team,
                        race_id: id,
                        laps: driverLaps,
                        points: driverPoints,
                    });
                    return;
                }

                await axios.put(`/teamRaceResults/${get(data, 'id')}`, {
                    team_id: drivers.filter(driver => `${driver.name} ${driver.surname}` === selectedDriver)[0].team,
                    race_id: id,
                    laps: Number(get(data, 'laps')) + Number(driverLaps),
                    points: Number(get(data, 'points')) + Number(driverPoints),
                });
            })();

            (async function() {
                const { data, status } = await axios.get(`/teamClassifications/team/${drivers.filter(driver => `${driver.name} ${driver.surname}` === selectedDriver)[0].team}`);
                if (status === 204) {
                    await axios.post(`/teamClassifications`, {
                        season_id: seasons.filter(season => season.year === selectedSeason)[0].id,
                        team_id: drivers.filter(driver => `${driver.name} ${driver.surname}` === selectedDriver)[0].team,
                        points: driverPoints,
                    });
                    return;
                }

                const classificationId = get(data, 'id');
                const classificationPoints = get(data, 'points');
                
                await axios.put(`/teamClassifications/${classificationId}`, {
                    season_id: seasons.filter(season => season.year === selectedSeason)[0].id,
                    team_id: drivers.filter(driver => `${driver.name} ${driver.surname}` === selectedDriver)[0].team,
                    points: Number(classificationPoints) + Number(driverPoints),
                });
                return;
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
        if (!isLogged) return navigate('/');
        if (user.type !== 'ADMIN') return navigate('/');
        if (mode !== 'admin') setAdmin();
        if (!id) return;

        (async function() {
            const response = await axios.get(`/drivers`);
            const data = get(response, 'data');
            setDrivers(data.map((driver) => {
                return {
                    id: driver.id,
                    name: driver.name,
                    surname: driver.surname,
                    team: get(driver, 'team.team_id')
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

        if (selectedDriver) {

            if (!/^[0-9]{2}:[0-9]{2}:[0-9]{2}$/.test(driverTotalTime)) {
                toast.error('Tempo total inválido! (HH:mm:ss)');
                return false;
            }

            if (!/^[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}$/.test(driverInterval)) {
                toast.error('Intervalo inválido! (HH:mm:ss.SSS)');
                return false;
            }

            
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

                                <label htmlFor="driver">Registrar resultado de piloto:</label>
                                <Select setSelected={setSelectedDriver} selected={selectedDriver} options={drivers.map(driver => `${driver.name} ${driver.surname}`)}/>
                            
                                <label htmlFor="laps">Voltas do piloto:</label>
                                <input type="number" value={driverLaps} onChange={(e) => setDriverLaps(e.target.value)} step='0.1'/>

                                <label htmlFor="points">Pontos do piloto:</label>
                                <input type="number" value={driverPoints} onChange={(e) => setDriverPoints(e.target.value)} step='0.1'/>

                                <label htmlFor="total_time">Tempo total piloto:</label>
                                <input type="text" placeholder='(HH:mm:ss)' value={driverTotalTime} onChange={(e) => setDriverTotalTime(e.target.value)} step='0.1'/>

                                <label htmlFor="interval">Intervalo piloto:</label>
                                <input type="text" placeholder='(HH:mm:ss.SSS)' value={driverInterval} onChange={(e) => setDriverInterval(e.target.value)} step='0.1'/>
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