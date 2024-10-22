import { Container, Button } from '../../styles/GlobalStyles';
import { TitleHeader, Content, Drivers, Driver, DriverCircle, BackgroundImg, DriverPicture, DriverImg, DriverName, Name, ButtonDiv, DriverContainer } from './styled';
import { useFavoriteDrivers } from '../../hooks/useFavoriteDrivers';
import Loading from '../../components/Loading';

function FavoriteDriver() {

    const { drivers, handleDriverClick, handleButtonClick, isLoading, returnFavoriteTeam } = useFavoriteDrivers();

    return (
        <>
            <Container>
                <Loading isLoading={isLoading}/>
                <Content>
                    <TitleHeader>
                        <h1>ESCOLHA SEU PILOTO FAVORITO</h1>
                        <hr />
                    </TitleHeader>

                    <Drivers>
                        {drivers ? drivers.map((driver, index) => (
                            <DriverContainer key={index} color={driver.Team.main_color}>
                                <Driver id={driver.Driver.id} onClick={handleDriverClick}>
                                    <DriverCircle color={driver.Team.main_color}>

                                        <DriverPicture>
                                            {driver.Driver.driver_picture
                                                ? <DriverImg src={driver.Driver.driver_picture.url} alt="driver-picture" />
                                                : <DriverImg src="driver-default-picture.png" alt="driver-picture"/>
                                            }
                                        </DriverPicture>

                                        <BackgroundImg src='driver-background.jpg' alt="driver-background"/>
                                    </DriverCircle>
                                </Driver>

                                <DriverName>
                                    <Name>{`${driver.Driver.name} ${driver.Driver.surname}`}</Name>
                                </DriverName>
                            </DriverContainer>
                        )) : returnFavoriteTeam()}
                    </Drivers>

                    <ButtonDiv>
                        <Button onClick={handleButtonClick}>ESCOLHER</Button>
                    </ButtonDiv>

                </Content>
            </Container>
        </>
    );

}

export default FavoriteDriver;