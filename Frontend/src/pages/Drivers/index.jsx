import { Container } from "../../styles/GlobalStyles";
import { DriversContainer, TitleHeader, AllDrivers, Driver, DriverBackground, DriverHeader, DriverName, Name, Surname, DriverCountry, DriverInfo, Number, BackgroundImg, DriverImg, DriverPicture } from './styled';
import { Link } from 'react-router-dom';
import { useDrivers } from "../../hooks/useDrivers";

function Drivers() {

    const { drivers } = useDrivers();

    return (
        <>
            <Container>
                <DriversContainer>

                    <TitleHeader>
                        <h1>PILOTOS FÓRMULA 1 - 2024</h1>
                        <hr />
                    </TitleHeader>

                    <AllDrivers>
                        {drivers.map((driver, index) => (
                            <Driver key={index}>
                                <DriverHeader>
                                    <DriverInfo>
                                        <Number color={driver.color}>{driver.driver_stat ? driver.driver_stat.number : '00' }</Number>
                                        <DriverName>
                                            <Name>{driver.name}</Name>
                                            <Surname>{driver.surname}</Surname>
                                        </DriverName>
                                    </DriverInfo>

                                    <DriverCountry>
                                        <img src={driver.country ? driver.country.country_picture.url : 'flag-test.png'} alt="driver-country-flag" />
                                    </DriverCountry>
                                </DriverHeader>

                                <Link to={`/piloto/${driver.short_name}`}>
                                    <DriverBackground driverColor={driver.color}>
                                        
                                            <DriverPicture>
                                                {driver.driver_picture
                                                    ? <DriverImg src={driver.driver_picture.url} alt="driver-picture" className="driver-image"/>
                                                    : <DriverImg src="driver-default-picture.png" alt="driver-picture" className="driver-image"/>
                                                }
                                            </DriverPicture>

                                        <BackgroundImg src="driver-background.jpg" alt="driver-background" className="background-image"/>
                                    </DriverBackground>
                                </Link>
                            </Driver>
                            
                        ))}
                    </AllDrivers>

                </DriversContainer>
            </Container>
        </>
    );

}

export default Drivers;