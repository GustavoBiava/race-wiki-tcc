import { get } from 'lodash';
import { Link } from 'react-router-dom';

import { Container } from '../../styles/GlobalStyles';
import { useTeam } from '../../hooks/useTeam';
import { 
    Content,
    BackgroundImg,
    TeamBackground,
    DriverImg,
    TeamPicture,
    TeamContainer,
    TeamDiv,
    DriverTeams,
    Driver,
    TeamBackgroundImg,
    DriverPicture,
    TeamImg,
    TdTitle,
    TdContent,
    SectionContainer,
    TitleHeader,
    DriverDescription,
    TableContainer,
    ResultsTable,
    NameTd,
    NameTableDiv,
    PointsTd,
    TeamFooter,
    TeamInfo,
    TeamCountry,
    TeamStats,
    TeamStatsContainer,
    TeamStatTable,
    DriverCircle,
} from './styled';

function Team() {

    const { team, teamRaceResult, formatDate, goToRacePage } = useTeam();
    
    return (
        <Container>
            <Content>
                <TeamContainer>
                    <TeamDiv>
                        <TeamBackground teamColor={team.main_color}>                       
                                <TeamPicture>
                                    {team.team_picture
                                        ? <TeamImg src={team.team_picture.url} alt="team-picture" />
                                        : <TeamImg src="/team-default-picture.png" alt="team-picture"/>
                                    }
                                </TeamPicture>

                                <BackgroundImg src="/driver-background.jpg" alt="team-background"/>
                            </TeamBackground>

                            <TeamFooter>
                                    <h2>{team.name}</h2>
                                    <TeamInfo>
                                        <TeamCountry>
                                            { get(team, 'country.country_picture')
                                                ? <img src={team.country.country_picture.url} alt="team-country-flag" />
                                                : <img src='/country-default-picture.png' alt="dteam-country-flag" />
                                            }
                                        </TeamCountry>
                                    </TeamInfo>
                            </TeamFooter>
                    </TeamDiv>

                <TeamStats>
                    <TeamStatsContainer>
                        <TeamStatTable cellSpacing={10}>

                            <tr>
                                <td><TdTitle>Nacionalidade: </TdTitle></td>
                                <td><TdContent>{get(team, 'country.name')}</TdContent></td>
                            </tr>

                            <tr>
                                <td><TdTitle>Chefe Técnico: </TdTitle></td>
                                <td><TdContent>{team.technical_chief}</TdContent></td>
                            </tr>

                            <tr>
                                <td><TdTitle>Chefe de Equipe: </TdTitle></td>
                                <td><TdContent>{team.team_chief}m</TdContent></td>
                            </tr>

                            <tr>
                                <td><TdTitle>Primeira Participação: </TdTitle></td>
                                <td><TdContent>{formatDate(team.first_participation)}</TdContent></td>
                            </tr>

                            <tr>
                                <td><TdTitle>Títulos de Equipe: </TdTitle></td>
                                <td><TdContent>{team.constructors_championships}</TdContent></td>
                            </tr>

                            <tr>
                                <td><TdTitle>Motor: </TdTitle></td>
                                <td><TdContent>{team.power_unit}</TdContent></td>
                            </tr>

                            <tr>
                                <td><TdTitle>Pole Positions: </TdTitle></td>
                                <td><TdContent>{team.pole_positions}</TdContent></td>
                            </tr>

                            <tr>
                                <td><TdTitle>Voltas Mais Rápidas: </TdTitle></td>
                                <td><TdContent>{team.fastest_laps}</TdContent></td>
                            </tr>

                            <tr>
                                <td><TdTitle>Melhor Posição de Chegada: </TdTitle></td>
                                <td><TdContent>{team.highest_race_finish} ({team.times_highest_finish}x)</TdContent></td>
                            </tr>
                        </TeamStatTable>
                    </TeamStatsContainer>
                    <DriverTeams>
                            { get(team, 'drivers')
                                ? team.drivers.map((driver, index) => (
                                    <Driver key={index}>
                                        <Link to={`/piloto/${driver.Driver.short_name}`}>
                                            <DriverCircle color={team.main_color}>

                                                <DriverPicture>
                                                    {get(driver, 'Driver.driver_picture.url')
                                                        ? <DriverImg src={driver.Driver.driver_picture.url} alt="driver-picture" />
                                                        : <DriverImg src="/driver-default-picture.png" alt="driver-picture"/>
                                                    }
                                                </DriverPicture>

                                                <TeamBackgroundImg src='/driver-background.jpg' alt="driver-background"/>
                                            </DriverCircle>
                                        </Link>
                                    </Driver>
                                ))
                                :  ''
                            }
                        </DriverTeams>
                </TeamStats>
                </TeamContainer>

                <SectionContainer>
                    <TitleHeader>
                        <h1>DETALHES</h1>
                        <hr />
                    </TitleHeader>

                    <DriverDescription>
                        <p>{ team.description }</p>
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
                                <th>DATA</th>
                                <th>CORRIDA</th>
                                <th>VOLTAS</th>
                                <th>PONTOS</th>
                            </tr>


                            { get(teamRaceResult, '[0]') ? teamRaceResult.map((result, index) => (
                                    <tr key={index} onClick={goToRacePage} id={result.Race.slug}>
                                        <td>{formatDate(result.Race.date)}</td>
                                        <NameTd>
                                            <NameTableDiv>
                                                <h3>{result.Race.name}</h3>
                                            </NameTableDiv>
                                        </NameTd>
                                        <td>{result.laps}</td>
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

export default Team;