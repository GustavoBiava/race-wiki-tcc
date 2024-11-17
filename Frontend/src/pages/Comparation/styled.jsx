import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Content = styled.div`
    width: 70vw;
    height: fit-content;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 7em 0;
`;

export const ChartContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.mode === 'dark' ? colors.mainGray : colors.mainWhite};
    border-radius: 0.5em;
    width: 100%;
    height: 100%; 
    padding: 3em;

    @media (max-width: 948px) {
        padding: 1.8em;
    }

`;