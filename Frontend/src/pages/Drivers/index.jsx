import { useEffect, useState } from "react";
import { Container } from "../../styles/GlobalStyles";
import { DriversContainer, DriversHeader, AllDrivers, Driver, DriverBackground, DriverHeader, DriverName } from './styled';
import axios from '../../config/axios';

function Drivers() {

    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        try {
            (async function() {
                const response = await axios.get('/drivers');
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

                    <DriversHeader>
                        <h1>PILOTOS FÓRMULA 1 - 2024</h1>
                        <hr />
                    </DriversHeader>

                    <AllDrivers>
                        {drivers.map((driver, index) => (
                            <Driver key={index}>
                                <DriverHeader>
                                    <DriverName>
                                        <p>{driver.name}</p>
                                        <h2>{driver.surname}</h2>
                                    </DriverName>

                                </DriverHeader>

                                <DriverBackground driverColor={'#223971'}>
                                    <img src="driver-background.jpg" alt="driver-background" />
                                </DriverBackground>
                            </Driver>
                        ))}
                    </AllDrivers>

                </DriversContainer>
            </Container>
        </>
    );

}

export default Drivers;