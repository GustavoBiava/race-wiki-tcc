import { Container } from "../../styles/GlobalStyles";
import { Link } from 'react-router-dom';
import { useTeams } from "../../hooks/useTeams";
import Loading from '../../components/Loading';
import { 
    TeamsContainer,
    TitleHeader,
    AllTeams,
    Team,
    TeamBackground,
    TeamHeader,
    TeamTitle,
    TeamCountry,
    TeamInfo,
    BackgroundImg,
    TeamImg,
    TeamPicture,
    ResponsiveImg
} from './styled';

function Teams() {

    const { teams, isLoading } = useTeams();

    return (
        <>
            <Container>
                <Loading isLoading={isLoading}/>
                <TeamsContainer>

                    <TitleHeader>
                        <h1>EQUIPES FÓRMULA 1 - 2024</h1>
                        <hr />
                    </TitleHeader>

                    <AllTeams>
                        {teams.map((team, index) => (
                            <Team key={index}>
                                <TeamHeader>
                                    <TeamInfo>
                                        <TeamTitle>{team.name}</TeamTitle>
                                    </TeamInfo>

                                    <TeamCountry>
                                        <img src={team.country.country_picture ? team.country.country_picture.url : 'country-default-picture.png'} alt="team-country-flag" />
                                    </TeamCountry>
                                </TeamHeader>

                                <Link to={`/equipe/${team.short_name}`}>
                                    <TeamBackground teamColor={team.main_color}>
                                        
                                            {<TeamPicture>
                                                {team.team_picture
                                                    ? <TeamImg src={team.team_picture.url} alt="team-picture"/>
                                                    : <TeamImg src="team-default-picture.png" alt="team-picture" />
                                                }
                                            </TeamPicture>}

                                        <BackgroundImg src='team-background.jpg' alt="team-background"/>
                                        <ResponsiveImg src='driver-background.jpg' alt="team-background"/>
                                    </TeamBackground>
                                </Link>
                            </Team>
                            
                        ))}
                    </AllTeams>

                </TeamsContainer>
            </Container>
        </>
    );

}

export default Teams;