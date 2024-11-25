import { Bar } from 'react-chartjs-2';
import Select from '../../components/Select';

import { Container } from '../../styles/GlobalStyles';
import { useComparation } from '../../hooks/useComparation';
import { 
    ChartBackground,
    ChartContainer,
    Content,
    TitleHeader,
} from './styled';

function Comparation() {

    const { data, options, driver1, driver2, drivers, setDriver1, setDriver2 } = useComparation();

    return (
        <Container>
            <Content>
                <ChartContainer>
                    <TitleHeader>
                        <h1>COMPARAR</h1>
                        <hr />
                    </TitleHeader>

                    <ChartBackground>
                        <Bar data={data} options={options}/>
                    </ChartBackground>
                    <ChartBackground>
                        <Select selected={driver1} setSelected={setDriver1} options={drivers.map(driver => driver.name)}/>
                        <Select selected={driver2} setSelected={setDriver2}/>
                    </ChartBackground>

                </ChartContainer>
            </Content>
        </Container>
    );

}

export default Comparation;
