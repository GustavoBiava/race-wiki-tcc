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

function Team() {

    const { id } = useParams();
    
    const navigate = useNavigate();

    const [countries, setCountries] = useState([]);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [firstApparition, setFirstApparition] = useState('');
    const [teamChief, setTeamChief] = useState('');
    const [technicalChief, setTechnicalChief] = useState('');
    const [constructorsChampionships, setConstructorsChampionships] = useState('');
    const [bestRacePosition, setBestRacePosition] = useState(0);
    const [timesBestFinish, setTimesBestFinish] = useState(0);
    const [fastestLaps, setFastestLaps] = useState(0);
    const [polePositions, setPolePositions] = useState(0);
    const [color, setColor] = useState('');
    const [powerUnit, setPowerUnit] = useState('');
    const [shortName, setShortName] = useState('');
    const [selected, setSelected] = useState('');
    const [image, setImage] = useState();

    const handleButtonClick = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        try {
            if (!id) {
                (async function() {
                    await axios.post(`/teams`, { 
                        name,
                        description,
                        first_apparition: firstApparition,
                        team_chief: teamChief,
                        technical_chief: technicalChief,
                        constructors_championships: constructorsChampionships,
                        highest_race_finish: bestRacePosition,
                        times_highest_finish: timesBestFinish,
                        fastest_laps: fastestLaps,
                        pole_positions: polePositions,
                        main_color: color,
                        power_unit: powerUnit,
                        short_name: shortName,
                        nationality: countries.filter(country => country.name === selected)[0].id,
                    });
                })();
                navigate('/admin/equipes');
                return toast.success('Equipe criada com sucesso!'); 
            }

            (async function() {
                await axios.put(`/teams/${id}`, {
                    name,
                    description,
                    first_apparition: firstApparition,
                    team_chief: teamChief,
                    technical_chief: technicalChief,
                    constructors_championships: constructorsChampionships,
                    highest_race_finish: bestRacePosition,
                    times_highest_finish: timesBestFinish,
                    fastest_laps: fastestLaps,
                    pole_positions: polePositions,
                    main_color: color,
                    power_unit: powerUnit,
                    short_name: shortName,
                    nationality: countries.filter(country => country.name === selected)[0].id,
                });
            })();
            navigate('/admin/equipes');
            return toast.success('Equipe criada com sucesso!'); 
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
                const {data, status} = await axios.get(`/teams/${id}`);
                if (status === 204) {
                    navigate('/admin/pilotos');
                    return toast.error('Essa equipe não existe!');
                }

                const { name: countryName } = countries.filter(country => country.id === get(data, 'nationality'))[0];

                setName(get(data, 'name'));
                setDescription(get(data, 'description'));
                setPowerUnit(get(data, 'power_unit'))
                setFirstApparition(get(data, 'first_participation'));
                setTeamChief(get(data, 'team_chief'));
                setTechnicalChief(get(data, 'technical_chief'));
                setConstructorsChampionships(get(data, 'constructors_championships'))
                setBestRacePosition(get(data, 'highest_race_finish'));
                setTimesBestFinish(get(data, 'times_highest_finish'));
                setFastestLaps(get(data, 'fastest_laps'));
                setPolePositions(get(data, 'pole_positions'));
                setColor(get(data, 'main_color'));
                setShortName(get(data, 'short_name'));
                setSelected(countryName);
                setImage(get(data, 'team_picture.url', ''));
                return;
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
        formData.append('team_id', id);
        formData.append('archive', file);
    
        if (!image) {
            try {
                await axios.post('/pictures/teams', formData, {
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
            await axios.put('/pictures/teams', formData, {
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

        if (!description) {
            toast.error('Descrição inválida!');
            return false;
        }

        if (!firstApparition) {
            toast.error('Primeira aparição inválida!');
            return false;
        }

        if (!teamChief) {
            toast.error('Chefe de equipe inválido!');
            return false;
        }

        if (!technicalChief) {
            toast.error('Chefe técnico de equipe inválido!');
            return false;
        }

        if (!constructorsChampionships) {
            toast.error('Títulos de construtores inválido!');
            return false;
        }

        if (!bestRacePosition) {
            toast.error('Melhor posição de chegada inválido!');
            return false;
        }

        if (!timesBestFinish) {
            toast.error('Quantidade de melhor posição de chegada inválida!');
            return false;
        }

        if (!fastestLaps) {
            toast.error('Voltas mais rápidas inválidas!');
            return false;
        }

        if (!polePositions) {
            toast.error('Pole positions inválidas!');
            return false;
        }

        if (!color) {
            toast.error('Cor inválida!');
            return false;
        }

        if (!powerUnit) {
            toast.error('Motor inválido!');
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
                    <h1>{ id ? ('EDITAR EQUIPE') : ('ADICIONAR EQUIPE')}</h1>
                    <hr />
                </TitleHeader>

                <Form>
                    <FormBody>
                        <label htmlFor="name">Nome da equipe:</label>
                        <input type="text" placeholder='Digite aqui o nome da equipe...' value={name} onChange={(e) => setName(e.target.value)}/>
                        
                        <label htmlFor="team_chief">Chefe da equipe:</label>
                        <input type="text" placeholder='Digite aqui o chefe da equipe...' value={teamChief} onChange={(e) => setTeamChief(e.target.value)}/>
                        
                        <label htmlFor="technical_chief">Chefe técnico da equipe:</label>
                        <input type="text" placeholder='Digite aqui o chefe técnico da equipe...' value={technicalChief} onChange={(e) => setTechnicalChief(e.target.value)}/>
                        
                        <label htmlFor="first_apparition">Primeira participação:</label>
                        <input type="date" value={firstApparition} onChange={(e) => setFirstApparition(e.target.value)}/>

                        <label htmlFor="short_name">Nome curto da equipe:</label>
                        <input type="text" placeholder='Digite aqui o nome curto da equipe...' value={shortName} onChange={(e) => setShortName(e.target.value)}/>
                        
                        <label htmlFor="power_unit">Motor da equipe:</label>
                        <input type="text" value={powerUnit} onChange={(e) => setPowerUnit(e.target.value)}/>

                        <label htmlFor="color">Cor da equipe:</label>
                        <input type="color" value={color} onChange={(e) => setColor(e.target.value)}/>

                        <label htmlFor="description">Descrição da equipe:</label>
                        <CommentTextarea placeholder='Digite aqui a descrição da equipe...' value={description} onChange={(e) => setDescription(e.target.value)}/>

                        <label htmlFor="constructors_championships">Títulos da equipe:</label>
                        <input type="number" placeholder='Digite aqui o número de títulos da equipe...' value={constructorsChampionships} onChange={(e) => setConstructorsChampionships(e.target.value)} step='1'/>
                        
                        <label htmlFor="best_race_position">Melhor posição de chegada da equipe:</label>
                        <input type="number" placeholder='Digite aqui a melhor posição de chegada da equipe...' value={bestRacePosition} onChange={(e) => setBestRacePosition(e.target.value)} step='1'/>
                        
                        <label htmlFor="times_best_finish">Quantidade de melhores posições de chegada da equipe:</label>
                        <input type="number" placeholder='Digite aqui a quantidade de melhores posições de chegada da equipe...' value={timesBestFinish} onChange={(e) => setTimesBestFinish(e.target.value)} step='1'/>

                        <label htmlFor="fastest_laps">Voltas mais rápidas da equipe:</label>
                        <input type="number" placeholder='Digite aqui a quantidade de voltas mais rápidas da equipe...' value={fastestLaps} onChange={(e) => setFastestLaps(e.target.value)} step='1'/>
                        
                        <label htmlFor="pole_positions">Pole positions da equipe:</label>
                        <input type="number" placeholder='Digite aqui a quantidade de pole positions da equipe...' value={polePositions} onChange={(e) => setPolePositions(e.target.value)} step='1'/>

                        { id ? (
                            <>
                                <label>Imagem da equipe:</label>
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

                        <label htmlFor="type">Nacionalidade da equipe:</label>
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

export default Team;