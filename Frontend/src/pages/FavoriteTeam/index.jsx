import { useEffect, useState } from 'react';

import { Container, Button } from '../../styles/GlobalStyles';
import { TitleHeader, Content, Teams, Team, TeamCircle, BackgroundImg, TeamPicture, TeamImg, TeamName, Name, ButtonDiv, TeamContainer } from './styled';
import axios from '../../config/axios';

function FavoriteTeam() {

    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(0);

    const handleTeamClick = (e) => {
        const el = e.currentTarget;
        return selectTeam(el);
    }

    const selectTeam = (el) => {
        if (el.classList.contains('selected')) {
            el.classList.remove('selected');
            return setSelectedTeam(0);  
        } 

        const selectedClasses = document.querySelectorAll('.selected'); 
        if (selectedClasses.length > 0) return;
        
        el.classList.add('selected');
        
        return setSelectedTeam(el.id);
    }
 

    useEffect(() => {
        (async function() {
            try {
                const response = await axios.get('/pages/favoriteTeams');
                return setTeams(response.data);
            }
            catch (err) {
                const errors = err.errors || [{ message: 'FATAL ERROR!' }];
                return errors.map(e => alert(e.message));
            }
        })();
    }, []);

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

                    <ButtonDiv>
                        <Button>ESCOLHER</Button>
                    </ButtonDiv>
                </Content>
            </Container>
        </>
    );

}

export default FavoriteTeam;