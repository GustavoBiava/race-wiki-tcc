import { Line } from 'react-chartjs-2';
import Select from '../../components/Select';

import { Button, Container } from '../../styles/GlobalStyles';
import { useComparation } from '../../hooks/useComparation';
import { 
    ChartBackground,
    ChartContainer,
    Content,
    DriverContainer,
    TitleHeader,
} from './styled';

function Comparation() {

    const { data, options, driver1, driver2, drivers, setDriver1, setDriver2, handleCompareClick } = useComparation();

    return (
        <Container>
            <Content>
                <ChartContainer>
                    <TitleHeader>
                        <h1>COMPARAR</h1>
                        <hr />
                    </TitleHeader>

                    <ChartBackground>
                        <Line data={data} options={options}/>
                    </ChartBackground>
                    <ChartBackground>
                        <DriverContainer>
                            <label htmlFor="driver1">Piloto 1:</label>
                            <Select selected={driver1} setSelected={setDriver1} options={drivers.map(driver => `${driver.name} ${driver.surname}`)}/>
                        </DriverContainer>

                        <DriverContainer>
                            <label htmlFor="driver2">Piloto 2:</label>
                            <Select selected={driver2} setSelected={setDriver2} options={drivers.map(driver => `${driver.name} ${driver.surname}`)}/>
                        </DriverContainer>
                       
                        <Button onClick={handleCompareClick}>COMPARAR</Button>
                    </ChartBackground>

                </ChartContainer>
            </Content>
        </Container>
    );

}

export default Comparation;
