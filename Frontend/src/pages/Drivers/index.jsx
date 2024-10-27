import { Container } from "../../styles/GlobalStyles";
import { Link } from 'react-router-dom';
import { useDrivers } from "../../hooks/useDrivers";
import Loading from '../../components/Loading';
import {
    DriversContainer,
    TitleHeader,
    AllDrivers,
    Driver,
    DriverBackground,
    DriverHeader,
    DriverName,
    Name,
    Surname,
    DriverCountry,
    DriverInfo,
    Number,
    BackgroundImg,
    DriverImg,
    DriverPicture
} from './styled';

function Drivers() {

    const { drivers, isLoading } = useDrivers();

    return (
        <>
            <Container>
            <Loading isLoading={isLoading}/>
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
                                        <img src={driver.country.country_picture ? driver.country.country_picture.url : 'country-default-picture.png'} alt="driver-country-flag" />
                                    </DriverCountry>
                                </DriverHeader>

                                <Link to={`/piloto/${driver.short_name}`}>
                                    <DriverBackground driverColor={driver.color}>
                                        
                                            <DriverPicture>
                                                {driver.driver_picture
                                                    ? <DriverImg src={driver.driver_picture.url} alt="driver-picture" />
                                                    : <DriverImg src="driver-default-picture.png" alt="driver-picture"/>
                                                }
                                            </DriverPicture>

                                        <BackgroundImg src="driver-background.jpg" alt="driver-background"/>
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