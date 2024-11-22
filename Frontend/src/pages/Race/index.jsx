import { get } from 'lodash';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { useRace } from '../../hooks/useRace';

import { Link } from 'react-router-dom';
import { Container } from '../../styles/GlobalStyles';
import { 
    Content,
    RaceContainer,
    Country,
    SwiperContainer,
    SwiperImgDiv,
    SwiperImg,
    RaceFooter,
    CountryDiv,
    RaceStats,
    RaceStatsContainer,
    RaceStatTable,
    TdTitle,
    TdContent,
    TitleHeader,
    TableContainer,
    ResultsTable,
    ResponsiveTh,
    PosistionTd,
    NameTd,
    NameTableDiv,
    ColorDetail,
    ResponsiveTd,
    PointsTd,
    ResultContainer,
    ClassificationLeaders,
    Leader,
    DriverBackground,
    LeaderImg,
    BackgroundImg,
    LeaderDetails,
    NameCointainer,
    Number,
    LeaderName,
    Name,
    Surname,
    PointsContainer,
    Points,
} from './styled';

function Race() {

    const { formatDate, goToDriverPage, race } = useRace();

    return (
        <Container>
            <Content>
                <RaceContainer>
                    <SwiperContainer>
                        <Swiper
                            slidesPerView={1}
                            effect={'fade'}
                            pagination={{ clickable: true, hideOnClick: true}}
                            navigation
                            autoplay={{
                                delay: 6000,
                                disableOnInteraction: false,
                            }}
                            modules={[Navigation, Autoplay, Pagination, EffectFade]
                            }>
                                {get(race, 'race_picture[0]') ? race.race_picture.map((picture, index) => (
                                        <SwiperSlide key={index}>
                                                <SwiperImgDiv>
                                                    { picture.url
                                                        ? <SwiperImg src={ picture.url } alt="race-picture" />
                                                        : <SwiperImg src='race-default-picture.jpg' alt="race-picture" />
                                                    }
                                                </SwiperImgDiv>
                                        </SwiperSlide>
                                )) : ''}
                        </Swiper>

                        <RaceFooter>
                                <h2>{race.name}</h2>
                                <CountryDiv>
                                    { get(race, 'place.country_picture.url')
                                        ? <Country src={race.place.country_picture.url} alt='race-place'/>
                                        : <Country src='/country-default-picture.png' alt='race-place'/>
                                    }
                                </CountryDiv>
                        </RaceFooter>
                    </SwiperContainer>

                    <RaceStats>
                        <RaceStatsContainer>
                            <RaceStatTable cellSpacing={10}>

                            { race.is_done 
                                    ? (
                                        <>
                                            <tr>
                                                <td><TdTitle>Vencedor: </TdTitle></td>
                                                <td><TdContent>{race.winner_driver.name} {race.winner_driver.surname}</TdContent></td>
                                            </tr>

                                            <tr>
                                                <td><TdTitle>Pole Position: </TdTitle></td>
                                                <td><TdContent>{race.position_pole.name} {race.position_pole.surname}</TdContent></td>
                                            </tr>
                                        </>
                                    )
                                    : ''
                                }
                                <tr>
                                    <td><TdTitle>País: </TdTitle></td>
                                    <td><TdContent>{get(race, 'place.name')}</TdContent></td>
                                </tr>

                                <tr>
                                    <td><TdTitle>Data: </TdTitle></td>
                                    <td><TdContent>{formatDate(race.date)}</TdContent></td>
                                </tr>

                                <tr>
                                    <td><TdTitle>Voltas: </TdTitle></td>
                                    <td><TdContent>{race.laps_quantity}</TdContent></td>
                                </tr>

                                <tr>
                                    <td><TdTitle>Distância: </TdTitle></td>
                                    <td><TdContent>{race.race_distance} km</TdContent></td>
                                </tr>

                                <tr>
                                    <td><TdTitle>Tipo: </TdTitle></td>
                                    <td><TdContent>{race.type}</TdContent></td>
                                </tr>

                                <tr>
                                    <td><TdTitle>Circuito: </TdTitle></td>
                                    <td><TdContent>{get(race, 'circuit.name')}</TdContent></td>
                                </tr>

                                <tr>
                                    <td><TdTitle>Tamanho do Circuito: </TdTitle></td>
                                    <td><TdContent>{get(race, 'circuit.circuit_length')} km</TdContent></td>
                                </tr>

                                { !race.is_done ? (
                                    <tr>
                                        <td><TdTitle>Primeira Aparição Circuito: </TdTitle></td>
                                        <td><TdContent>{formatDate(get(race, 'circuit.first_apparition'))}</TdContent></td>
                                    </tr>
                                ) : ''}

                                

                            </RaceStatTable>
                        </RaceStatsContainer>

                    </RaceStats>
                </RaceContainer>

                <ResultContainer>
                    <TitleHeader>
                        <h1>RESULTADO</h1>
                        <hr />
                    </TitleHeader>

                    <ClassificationLeaders>
                        { get(race, 'race_podium[0]') ? race.race_podium.map((leader, index) => (
                            <Leader key={index}>
                                <Link to={`/piloto/${leader.Driver.short_name}`}>
                                    <DriverBackground driverColor={leader.color}>
                                        
                                        { leader.Driver.driver_picture
                                            ? <LeaderImg src={leader.Driver.driver_picture.url} alt='driver-picture'/>
                                            : <LeaderImg src='/driver-default-picture.png' alt='driver-picture'/>
                                        }

                                        <BackgroundImg src='/driver-background.jpg' alt='driver-background'/>
                                    </DriverBackground>

                                    <LeaderDetails>
                                        <Number color={leader.color}>{leader.position}</Number>

                                        <NameCointainer>
                                            <LeaderName>
                                                <Name>{leader.Driver.name}</Name>
                                                { get(leader, 'Driver.country.country_picture.url') 
                                                    ? <Country src={leader.Driver.country.country_picture.url} alt='driver-country'/> 
                                                    : <Country src='/country-default-picture.png' alt='driver-country'/> 
                                                }
                                            </LeaderName>
                                            <Surname>{leader.Driver.surname}</Surname>
                                        </NameCointainer>

                                        <PointsContainer>
                                            <Points color={leader.color}>{leader.points} Pts</Points>
                                        </PointsContainer>
                                        
                                    </LeaderDetails>
                                </Link>
                            </Leader>
                        )) : ''}
                    </ClassificationLeaders>

                    <TableContainer>
                        <ResultsTable cellSpacing={0}>

                            <tr>
                                <th>POS</th>
                                <th>PILOTO</th>
                                <ResponsiveTh>VOLTAS</ResponsiveTh>
                                <th>TEMPO TOTAL</th>
                                <th>INTERVALO</th>
                                <th>PONTOS</th>
                            </tr>


                            { get(race, 'race_results[0]') ? race.race_results.map((result, index) => (
                                    <tr onClick={goToDriverPage} id={result.Driver.short_name} key={index}>
                                        <PosistionTd>{result.position}</PosistionTd>
                                        <NameTd>
                                            <NameTableDiv>
                                                <ColorDetail color={result.color}/>
                                                <h3>{result.Driver.name} {result.Driver.surname}</h3>
                                            </NameTableDiv>
                                        </NameTd>
                                        <ResponsiveTd>{result.laps}</ResponsiveTd>
                                        <td>{result.total_race_duration}</td>
                                        <td>+{result.interval_to_leader}</td>
                                        <PointsTd>{`${result.points} Pts`}</PointsTd>
                                    </tr>
                                )) : ''}
                        </ResultsTable>
                    </TableContainer>

                </ResultContainer>

            </Content>
        </Container>
    );

}

export default Race;