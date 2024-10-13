import { useEffect, useState } from "react";

import { Container } from "../../styles/GlobalStyles";
import { DriversContainer, TitleHeader, AllDrivers, Driver, DriverBackground, DriverHeader, DriverName, Name, Surname, DriverCountry, DriverInfo, Number, BackgroundImg, DriverImg, DriverPicture } from './styled';
import axios from '../../config/axios';
import { Link } from 'react-router-dom';

function Drivers() {

    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        try {
            (async function() {
                const response = await axios.get('/pages/drivers');
                return setDrivers(response.data);
            })();
        }
        catch (err) {
            const errors = err.errors || [{ message: 'FATAL ERROR!' }];
            return errors.map(e => alert(e.message));
        }
    }, []);

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
                                        <img src="flag-test.png" alt="driver-country-flag" />
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