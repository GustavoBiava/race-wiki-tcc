import { Link } from 'react-router-dom';

import { Container, Button } from '../../styles/GlobalStyles';
import { useFavoriteTeams } from '../../hooks/useFavoriteTeams';
import { TitleHeader, Content, Teams, Team, TeamCircle, BackgroundImg, TeamPicture, TeamImg, TeamName, Name, ButtonDiv, TeamContainer } from './styled';

function FavoriteTeam() {

    const { teams, selectedTeam, handleTeamClick } = useFavoriteTeams();

    return (
        <>
            <Container>
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

                    <Link to='/piloto-favorito' state={selectedTeam}>
                        <ButtonDiv>
                            <Button>ESCOLHER</Button>
                        </ButtonDiv>
                    </Link>

                </Content>
            </Container>
        </>
    );

}

export default FavoriteTeam;