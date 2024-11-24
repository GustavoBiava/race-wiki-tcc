import { get } from 'lodash';
import { Link } from 'react-router-dom';

import { Container } from '../../styles/GlobalStyles';
import { useDriver } from '../../hooks/useDriver';
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

    const { driver, driverResults, formatDate, goToRacePage } = useDriver();
    
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
                                        <Number color={driver.color}>{get(driver, 'driver_stat.number', '00')}</Number>
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
                        <DriverStatTable cellSpacing={10}>

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
                                <td><TdContent>{get(driver, 'driver_stat.drivers_championships', '00')}</TdContent></td>
                            </tr>

                            <tr>
                                <td><TdTitle>Corridas Disputadas: </TdTitle></td>
                                <td><TdContent>{get(driver, 'driver_stat.races_entered', '00')}</TdContent></td>
                            </tr>

                            <tr>
                                <td><TdTitle>Vitórias: </TdTitle></td>
                                <td><TdContent>{get(driver, 'driver_stat.victories', '00')}</TdContent></td>
                            </tr>

                            <tr>
                                <td><TdTitle>Pódios: </TdTitle></td>
                                <td><TdContent>{get(driver, 'driver_stat.podiums', '00')}</TdContent></td>
                            </tr>

                            <tr>
                                <td><TdTitle>Pontos na Carreira: </TdTitle></td>
                                <td><TdContent>{get(driver, 'driver_stat.career_points', '00')}</TdContent></td>
                            </tr>

                            <tr>
                                <td><TdTitle>Melhor Posição de Largada: </TdTitle></td>
                                <td><TdContent>{get(driver, 'driver_stat.highest_grid_position', '00')}</TdContent></td>
                            </tr>

                            <tr>
                                <td><TdTitle>Melhor Posição de Chegada: </TdTitle></td>
                                <td><TdContent>{get(driver, 'driver_stat.highest_race_finish', '00')} ({get(driver, 'driver_stat.times_highest_finish', '0')}x)</TdContent></td>
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
                                                        : <TeamImg src="/team-default-picture.png" alt="team-picture"/>
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