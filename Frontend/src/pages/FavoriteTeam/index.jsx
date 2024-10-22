import { Container, Button } from '../../styles/GlobalStyles';
import { useFavoriteTeams } from '../../hooks/useFavoriteTeams';
import { TitleHeader, Content, Teams, Team, TeamCircle, BackgroundImg, TeamPicture, TeamImg, TeamName, Name, ButtonDiv, TeamContainer } from './styled';
import Loading from '../../components/Loading';

function FavoriteTeam() {

    const { teams, handleTeamClick, handleButtonClick, isLoading } = useFavoriteTeams();

    return (
        <>
            <Container>
                <Loading isLoading={isLoading}/>
                <Content>
                    <TitleHeader>
                        <h1>ESCOLHA SUA EQUIPE FAVORITA</h1>
                        <hr />
                    </TitleHeader>

                    <Teams>
                        {teams.map((team, index) => (
                            <TeamContainer key={index} color={team.main_color}>
                                <Team id={team.id} onClick={handleTeamClick}>
                                    <TeamCircle color={team.main_color}>

                                        <TeamPicture>
                                            {team.team_picture
                                                ? <TeamImg src={team.team_picture.url} alt="team-picture" />
                                                : <TeamImg src="team-default-picture.png" alt="team-picture"/>
                                            }
                                        </TeamPicture>

                                        <BackgroundImg src='driver-background.jpg' alt="team-background"/>
                                    </TeamCircle>
                                </Team>

                                <TeamName>
                                    <Name>{team.name}</Name>
                                </TeamName>
                            </TeamContainer>
                        ))}

                    </Teams>

                    <ButtonDiv onClick={handleButtonClick}>
                        <Button>ESCOLHER</Button>
                    </ButtonDiv>

                </Content>
            </Container>
        </>
    );

}

export default FavoriteTeam;