import { Link } from 'react-router-dom';

import { Container, Button } from '../../styles/GlobalStyles';
import { TitleHeader, Content, Drivers, Driver, DriverCircle, BackgroundImg, DriverPicture, DriverImg, DriverName, Name, ButtonDiv, DriverContainer } from './styled';
import { useFavoriteDrivers } from '../../hooks/useFavoriteDrivers';

function FavoriteDriver() {

    const { drivers, selectedDriver, handleDriverClick } = useFavoriteDrivers();

    return (
        <>
            <Container>
                <Content>
                    <TitleHeader>
                        <h1>ESCOLHA SEU PILOTO FAVORITO</h1>
                        <hr />
                    </TitleHeader>

                    <Drivers>
                        {drivers.map((driver, index) => (
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
                        ))}
                    </Drivers>

                    <Link to='/piloto-favorito'>
                        <ButtonDiv>
                            <Button>ESCOLHER</Button>
                        </ButtonDiv>
                    </Link>

                </Content>
            </Container>
        </>
    );

}

export default FavoriteDriver;