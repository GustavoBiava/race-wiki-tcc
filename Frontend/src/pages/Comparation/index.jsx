import { Bar } from 'react-chartjs-2';
import { IoIosArrowDown } from "react-icons/io";

import { Container } from '../../styles/GlobalStyles';
import { useComparation } from '../../hooks/useComparation';
import { 
    ChartBackground,
    ChartContainer,
    Content,
    TitleHeader,
    Select,
    OptionContainer,
} from './styled';

function Comparation() {

    const { data, options } = useComparation();

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
                        <Select>
                            <option value=""> <IoIosArrowDown size={25}/>                    </option>
                        </Select>
                    </ChartBackground>

                </ChartContainer>
            </Content>
        </Container>
    );

}

export default Comparation;
