import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { Link } from 'react-router-dom';

import { Container } from '../../styles/GlobalStyles';
import axios from '../../services/axios';
import { 
    Content,
    BackgroundImg,
    DriverBackground,
    DriverImg,
    DriverPicture,
    DriverContainer,
    DriverFooter,
    DriverCountry,
    DriverDiv,
    DriverStatTable,
    DriverStats,
    DriverStatsContainer,
    Number,
    DriverInfo,
    DriverTeams,
    Team,
    TeamCircle,
    TeamBackgroundImg,
    TeamPicture,
    TeamImg,
    TdTitle,
    TdContent,
    SectionContainer,
    TitleHeader,
    DriverDescription,
    TableContainer,
    ResultsTable,
    PosistionTd,
    NameTd,
    NameTableDiv,
    PointsTd,
    ColorDetail,
    ResponsiveTd,
    ResponsiveTh,
} from './styled';

function Driver() {

    const { shortName } = useParams();
    const navigate = useNavigate();
    const [driver, setDriver] = useState({});
    const [driverResults, setDriverResults] = useState({});

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-br', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

    const goToRacePage = (e) => navigate(`/corrida/${e.currentTarget.id}`); 

    useEffect(() => {
        if (!shortName) return navigate('/');
        try {
            (async function() {
                const response = await axios.get(`/pages/driver/${shortName}`);
                return setDriver(response.data);
            })();

            (async function() {
                const response = await axios.get(`/pages/driver/${shortName}/2024`);
                return setDriverResults(response.data);
            })();
        }
        catch (err) {
            const errors = get(err, 'response.data.errors', []);
            return errors.map(e => toast.error(e));
        }
    }, []);

    return (
        <Container>
            <Content>
                <DriverContainer>
                    <DriverDiv>
                        <DriverBackground driverColor={driver.color}>                       
                                <DriverPicture>
                                    {driver.driver_picture
                                        ? <DriverImg src={driver.driver_picture.url} alt="driver-picture" />
                                        : <DriverImg src="/driver-default-picture.png" alt="driver-picture"/>
                                    }
                                </DriverPicture>

                                <BackgroundImg src="/driver-background.jpg" alt="driver-background"/>
                            </DriverBackground>

                            <DriverFooter>
                                    <DriverInfo>
                                        <Number color={driver.color}>{get(driver, 'driver_stat.number')}</Number>
                                        <DriverCountry>
                                            { get(driver, 'country.country_picture')
                                                ? <img src={driver.country.country_picture.url} alt="driver-country-flag" />
                                                : <img src='country-default-picture.png' alt="driver-country-flag" />
                                            }
                                        </DriverCountry>
                                    </DriverInfo>
                                    <h2>{driver.name} {driver.surname}</h2>
                            </DriverFooter>
                    </DriverDiv>

                <DriverStats>
                    <DriverStatsContainer>
                        <DriverStatTable>

                            <tr>
                                <td><TdTitle>Nome Curto: </TdTitle></td>
                                <td><TdContent>{driver.short_name}</TdContent></td>
                            </tr>

                            <tr>
                                <td><TdTitle>Nacionalidade: </TdTitle></td>
                                <td><TdContent>{get(driver, 'country.name')}</TdContent></td>
                            </tr>

                            <tr>
                                <td><TdTitle>Altura: </TdTitle></td>
                                <td><TdContent>{driver.height}m</TdContent></td>
                            </tr>

                            <tr>
                                <td><TdTitle>Data de Nascimento: </TdTitle></td>
                                <td><TdContent>{formatDate(driver.birth_date)}</TdContent></td>
                            </tr>

                            <tr>
                                <td><TdTitle>Títulos de Piloto: </TdTitle></td>
                                <td><TdContent>{get(driver, 'driver_stat.drivers_championships')}</TdContent></td>
                            </tr>

                            <tr>
                                <td><TdTitle>Corridas Disputadas: </TdTitle></td>
                                <td><TdContent>{get(driver, 'driver_stat.races_entered')}</TdContent></td>
                            </tr>

                            <tr>
                                <td><TdTitle>Vitórias: </TdTitle></td>
                                <td><TdContent>{get(driver, 'driver_stat.victories')}</TdContent></td>
                            </tr>

                            <tr>
                                <td><TdTitle>Pódios: </TdTitle></td>
                                <td><TdContent>{get(driver, 'driver_stat.podiums')}</TdContent></td>
                            </tr>

                            <tr>
                                <td><TdTitle>Pontos na Carreira: </TdTitle></td>
                                <td><TdContent>{get(driver, 'driver_stat.career_points')}</TdContent></td>
                            </tr>

                            <tr>
                                <td><TdTitle>Melhor Posição de Largada: </TdTitle></td>
                                <td><TdContent>{get(driver, 'driver_stat.highest_grid_position')}</TdContent></td>
                            </tr>

                            <tr>
                                <td><TdTitle>Melhor Posição de Chegada: </TdTitle></td>
                                <td><TdContent>{get(driver, 'driver_stat.highest_race_finish')} ({get(driver, 'driver_stat.times_highest_finish')}x)</TdContent></td>
                            </tr>
                        </DriverStatTable>
                    </DriverStatsContainer>
                    <DriverTeams>
                            { driver.teams
                                ? get(driver, 'teams', []).map((team, index) => (
                                    <Team key={index}>
                                        <Link to={`/equipe/${team.Team.short_name}`}>
                                            <TeamCircle color={team.Team.main_color} isActive={team.is_active}>

                                                <TeamPicture>
                                                    {team.Team.team_picture
                                                        ? <TeamImg isActive={team.is_active} src={team.Team.team_picture.url} alt="team-picture" />
                                                        : <TeamImg src="team-default-picture.png" alt="team-picture"/>
                                                    }
                                                </TeamPicture>

                                                <TeamBackgroundImg src='/driver-background.jpg' alt="team-background"/>
                                            </TeamCircle>
                                        </Link>
                                    </Team>
                                ))
                                :  ''
                            }
                        </DriverTeams>
                </DriverStats>
                </DriverContainer>

                <SectionContainer>
                    <TitleHeader>
                        <h1>DETALHES</h1>
                        <hr />
                    </TitleHeader>

                    <DriverDescription>
                        <p>{ driver.description }</p>
                    </DriverDescription>
                </SectionContainer>     

                <SectionContainer>
                    <TitleHeader>
                        <h1>ÚLTIMOS RESULTADOS</h1>
                        <hr />
                    </TitleHeader>

                    <TableContainer>
                        <ResultsTable cellSpacing={0}>

                            <tr>
                                <th>POS</th>
                                <th>CORRIDA</th>
                                <ResponsiveTh>DATA</ResponsiveTh>
                                <ResponsiveTh>VOLTAS</ResponsiveTh>
                                <th>TEMPO TOTAL</th>
                                <th>INTERVALO</th>
                                <th>PONTOS</th>
                            </tr>


                            { get(driverResults, '[0]') ? driverResults.map((result, index) => (
                                    <tr key={index} onClick={goToRacePage} id={result.Race.slug}>
                                        <PosistionTd>{result.position}</PosistionTd>
                                        <NameTd>
                                            <NameTableDiv>
                                                <ColorDetail color={driver.color}/>
                                                <h3>{result.Race.name}</h3>
                                            </NameTableDiv>
                                        </NameTd>
                                        <ResponsiveTd>{formatDate(result.Race.date)}</ResponsiveTd>
                                        <ResponsiveTd>{result.laps}</ResponsiveTd>
                                        <td>{result.total_race_duration}</td>
                                        <td>+{result.interval_to_leader}</td>
                                        <PointsTd>{`${result.points} Pts`}</PointsTd>
                                    </tr>
                                )) : ''}
                        </ResultsTable>
                    </TableContainer>
                </SectionContainer>
            </Content>
        </Container>
    );

}

export default Driver;