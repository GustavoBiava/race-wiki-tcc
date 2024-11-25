import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import Select from '../../../components/Select';
import Checkbox from '../../../components/Checkbox';
import { useSelector } from 'react-redux';

import { AdminContainer, Button } from '../../../styles/GlobalStyles';
import axios from '../../../services/axios';

import { 
    CheckboxContainer,
    Content,
    Form,
    FormBody,
    FormButton,
    TitleHeader,
} from './styled';
import { AdminContext } from '../../../contexts/AdminContext';

function Contract() {

    const { id } = useParams();
    
    const navigate = useNavigate();
    const { mode, unsetAdmin, setAdmin } = useContext(AdminContext);

    const [drivers, setDrivers] = useState([]);
    const [teams, setTeams] = useState([]);

    const [selectedDriver, setSelectedDriver] = useState('');
    const [selectedTeam, setSelectedTeam] = useState('');
    const [checkbox, setCheckbox] = useState(false);
    const { isLogged, user } = useSelector(states => states.auth);

    const handleButtonClick = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        try {
            if (!id) {
                (async function() {
                    await axios.post(`/careerContracts`, { 
                        driver_id: drivers.filter(driver => `${driver.name} ${driver.surname}` === selectedDriver)[0].id,
                        team_id: teams.filter(team => team.name === selectedTeam)[0].id,
                        is_active: checkbox,
                    });
                })();
                navigate('/admin/contratos');
                return toast.success('Contrato criado com sucesso!'); 
            }

            (async function() {
                await axios.put(`/careerContracts/${id}`, {
                    driver_id: drivers.filter(driver => `${driver.name} ${driver.surname}` === selectedDriver)[0].id,
                    team_id: teams.filter(team => team.name === selectedTeam)[0].id,
                    is_active: checkbox,
                });
            })();
            navigate('/admin/contratos');
            return toast.success('Contrato atualizado com sucesso!'); 
        }
        catch(err) {
            const errors = get(err, 'response.data.errors', []);
            return errors.map(e => toast.error(e));
        }
    }

    useEffect(() => {
        (async function() {
            const response = await axios.get(`/drivers`);
            const data = get(response, 'data');
            setDrivers(data.map((driver) => {
                return {
                    id: driver.id,
                    name: driver.name,
                    surname: driver.surname,
                }
            }));
        })();

        (async function() {
            const response = await axios.get(`/teams`);
            const data = get(response, 'data');
            setTeams(data.map((team) => {
                return {
                    id: team.id,
                    name: team.name,
                }
            }));
        })();
    }, []);

    useEffect(() => {       
        if (!isLogged) return navigate('/');
        if (user.type !== 'ADMIN') return navigate('/'); 
        if (mode !== 'admin') setAdmin();
        if (!id) return;

        try {
            (async function() {
                const {data, status} = await axios.get(`/careerContracts/${id}`);
                if (status === 204) {
                    navigate('/admin/contratos');
                    return toast.error('Esse contrato não existe!');
                }
                const driver = drivers.filter(driver => driver.id === get(data, 'driver_id'))[0];
                const team = teams.filter(team => team.id === get(data, 'team_id'))[0];

                setSelectedDriver(`${driver.name} ${driver.surname}`);
                setSelectedTeam(team.name);
                setCheckbox(get(data, 'is_active'));

            })();            
        }
        catch(err) {
            const errors = get(err, 'response.data.errors', []);
            return errors.map(e => toast.error(e));
        }
    }, [ drivers, id, navigate, teams]);

    function validateForm() {
        if (!selectedDriver) {
            toast.error('Piloto inválido!');
            return false;
        }

        if (!selectedTeam) {
            toast.error('Equipe inválida!');
            return false;
        }

        return true;
    }

    return (
        <AdminContainer>
            <Content>
                <TitleHeader>
                    <h1>{ id ? ('EDITAR CONTRATO') : ('ADICIONAR CONTRATO')}</h1>
                    <hr />
                </TitleHeader>

                <Form>
                    <FormBody>
                        <label htmlFor="type">Piloto do contrato:</label>
                        <Select selected={selectedDriver} setSelected={setSelectedDriver} options={drivers.map(driver => `${driver.name} ${driver.surname}`)}/>

                        <label htmlFor="type">Equipe do contrato:</label>
                        <Select selected={selectedTeam} setSelected={setSelectedTeam} options={teams.map(team => team.name)}/>

                        <label htmlFor="type">Está ativo:</label>
                        <CheckboxContainer>
                            <Checkbox onClick={() => setCheckbox(!checkbox)} selected={checkbox}/>
                        </CheckboxContainer>
                    </FormBody>

                    <FormButton>
                        <Button onClick={handleButtonClick}>{ id ? ('EDITAR') : ('SALVAR')}</Button>
                    </FormButton>
                </Form>
            </Content>
        </AdminContainer>
    );

}

export default Contract;