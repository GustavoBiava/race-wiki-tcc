import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { Link } from 'react-router-dom';

import { Container } from '../../styles/GlobalStyles';
import Loading from '../../components/Loading';
import { useHome } from '../../hooks/useHome';

import { 
    SwiperImg,
    SwiperContainer,
    TitleHeader,
    Content,
    SwiperImgDiv,
    RaceInfo,
    RacePlace,
    Country,
    Publications,
    Publication,
    PublicationImg,
    PublicationFooter,
    PublicationDetails,
    Tags,
    Tag,
    ClassificationLeaders,
    Leader,
    BackgroundImg,
    DriverBackground,
    LeaderImg,
    LeaderDetails,
    NameCointainer,
    Name,
    Surname,
    Number,
    PointsContainer,
    Points,
    ClassificationTable,
    TableContainer,
    PosistionTd,
    NameTd,
    PointsTd,
    ColorDetail,
    NameTableDiv,
    LeaderName,
    TeamBackground,
    TeamName,
    TeamImg

} from './styled';
import { get } from 'lodash';

function Home() {

    const {
        isLoading,
        races,
        publications,
        driverClassificationLeaders,
        driverClassification,
        formatDate,
        getPublicationHour,
        goToDriverPage,
        goToTeamPage,
        teamClassificationLeaders,
        teamClassification,
    } = useHome();

    return (
        <>
            <Loading isLoading={isLoading}/>
            <Container>
                <Content>
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

                                {races ? races.map((race, index) => (
                                        <SwiperSlide key={index}>
                                            <Link to={`/corrida/${race.slug}`}>
                                                <SwiperImgDiv>

                                                    <RaceInfo>
                                                        <h1>{race.name}</h1>
                                                        <h2>{formatDate(race.date)}</h2>
                                                        
                                                        <RacePlace>
                                                            <h3>{race.place.name}</h3>

                                                            {race.place.country_picture
                                                                ? <Country src={race.place.country_picture.url} alt='race-country-picture'/>
                                                                : <Country src='country-default-picture.png' alt='race-country-picture'/>
                                                            }
                                                        </RacePlace>
                                                    </RaceInfo>
                                                    
                                                    { race.race_picture.url
                                                        ? <SwiperImg src={ race.race_picture.url } alt="race-picture" />
                                                        : <SwiperImg src='race-default-picture.jpg' alt="race-picture" />
                                                    }

                                                </SwiperImgDiv>
                                            </Link>
                                        </SwiperSlide>
                                )) : ''}
                        </Swiper>
                    </SwiperContainer>

                    <TitleHeader>
                        <h1>ÚLTIMAS NOTÍCIAS</h1>
                        <hr />
                    </TitleHeader>

                    <Publications>
                        {publications ? publications.map((publication, index) => (
                            <Publication key={index}>
                                <Link to={`/noticias/${publication.slug}`}>

                                    <Tags>
                                        { publication.tags[0] 
                                            ? publication.tags.map((tag, index) => (
                                                 <Tag key={index}>
                                                    <Link to={`/procurar/${tag.slug}`}>
                                                        <p>{tag.tag_name}</p>
                                                    </Link>
                                                </Tag>
                                            ))
                                            : ''
                                        }
                                    </Tags>
                                
                                    { publication.publication_picture[0]
                                        ? <PublicationImg src={publication.publication_picture[0].url} alt='publication-image'/> 
                                        : <PublicationImg src='publication-default-picture.jpg' alt='publication-image'/>
                                    }

                                    <PublicationFooter>
                                        <h2>{publication.title}</h2>

                                        <PublicationDetails>
                                            <p>
                                                Publicado por: <span>{publication.publication_author.nickname}</span>
                                            </p>
                                            <p>
                                                Publicado há: <span>{getPublicationHour(publication.created_at)}</span>
                                            </p>
                                        </PublicationDetails>
                                    </PublicationFooter>

                                </Link>
                            </Publication>
                        )): ''}
                    </Publications>

                    <TitleHeader>
                        <h1>CLASSIFICAÇÃO PILOTOS - 2024</h1>
                        <hr />
                    </TitleHeader>

                    <ClassificationLeaders isTeam={false}>
                        { driverClassificationLeaders ? driverClassificationLeaders.map((leader, index) => (
                            <Leader key={index}>
                                <Link to={`/piloto/${leader.Driver.short_name}`}>
                                    <DriverBackground driverColor={leader.color}>
                                        
                                        { leader.Driver.driver_picture
                                            ? <LeaderImg src={leader.Driver.driver_picture.url} alt='driver-picture'/>
                                            : <LeaderImg src='driver-default-picture.png' alt='driver-picture'/>
                                        }

                                        <BackgroundImg src='driver-background.jpg' alt='driver-background'/>
                                    </DriverBackground>

                                    <LeaderDetails>
                                        <Number color={leader.color}>{leader.position}</Number>

                                        <NameCointainer>
                                            <LeaderName>
                                                <Name>{leader.Driver.name}</Name>
                                                { get(leader, 'Driver.country.country_picture.url') 
                                                    ? <Country src={leader.Driver.country.country_picture.url} alt='driver-country'/> 
                                                    : <Country src='country-default-picture.png' alt='driver-country'/> 
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
                        <ClassificationTable cellSpacing={0}>
                            { driverClassification ? driverClassification.map((driver, index) => (
                                <tr onClick={goToDriverPage} key={index} id={driver.Driver.short_name}>
                                    <PosistionTd>{driver.position}</PosistionTd>
                                    <NameTd>
                                        <NameTableDiv>
                                            <ColorDetail color={driver.color}/>
                                            <Name>{driver.Driver.name}</Name>
                                            <h3>{driver.Driver.surname}</h3>
                                            <Country src={driver.Driver.country.country_picture.url} alt='driver-country'/>
                                        </NameTableDiv>
                                    </NameTd>
                                    <PointsTd>{`${driver.points} Pts`}</PointsTd>
                                </tr>
                            )) : ''}

                        </ClassificationTable>
                    </TableContainer>
                    
                    <TitleHeader>
                        <h1>CLASSIFICAÇÃO EQUIPES - 2024</h1>
                        <hr />
                    </TitleHeader>

                    <ClassificationLeaders isTeam={true}>
                        { teamClassificationLeaders ? teamClassificationLeaders.map((leader, index) => (
                            <Leader key={index}>
                                <Link to={`/equipe/${leader.Team.short_name}`}>
                                    <TeamBackground teamColor={leader.Team.main_color}>
                                        
                                        { leader.Team.team_picture
                                            ? <TeamImg src={leader.Team.team_picture.url} alt='team-picture'/>
                                            : <TeamImg src='team-default-picture.png' alt='team-picture'/>
                                        }

                                        <BackgroundImg src='driver-background.jpg' alt='team-background'/>
                                    </TeamBackground>

                                    <LeaderDetails>
                                        <Number color={leader.Team.main_color}>{leader.position}</Number>

                                        <NameCointainer>
                                            <LeaderName isTeam={true}>
                                                <TeamName>{leader.Team.name}</TeamName>
                                                { get(leader, 'Team.country.country_picture.url') 
                                                    ? <Country src={leader.Driver.country.country_picture.url} alt='driver-country'/> 
                                                    : <Country src='country-default-picture.png' alt='driver-country'/> 
                                                }
                                            </LeaderName>
                                        </NameCointainer>

                                        <PointsContainer>
                                            <Points color={leader.Team.main_color}>{leader.points} Pts</Points>
                                        </PointsContainer>
                                        
                                    </LeaderDetails>
                                </Link>
                            </Leader>
                        )) : ''}
                    </ClassificationLeaders>

                    <TableContainer>
                        <ClassificationTable cellSpacing={0}>
                            { teamClassification ? teamClassification.map((team, index) => (
                                <tr onClick={goToTeamPage} key={index} id={team.Team.short_name}>
                                    <PosistionTd>{team.position}</PosistionTd>
                                    <NameTd>
                                        <NameTableDiv isTeam={true}>
                                            <ColorDetail color={team.Team.main_color}/>
                                            <h3>{team.Team.name}</h3>
                                            <Country src={team.Team.country.country_picture.url} alt='team-country'/>
                                        </NameTableDiv>
                                    </NameTd>
                                    <PointsTd>{`${team.points} Pts`}</PointsTd>
                                </tr>
                            )) : ''}

                        </ClassificationTable>
                    </TableContainer>

                </Content>
            
            </Container>
        </>
    );

}

export default Home;