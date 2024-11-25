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
    flex-direction: column;
    background-color: ${props => props.theme.mode === 'dark' ? colors.mainGray : colors.mainWhite};
    border-radius: 0.5em;
    width: 100%;
    height: 100%; 
    padding: 3em;
    gap: 2em 0;
`;

export const TitleHeader = styled.div`
    display: flex;
    align-items: start;
    flex-direction: column;
    width: 100%;
    margin: 0 0 2em 0;

    hr {
        border: 2.5px solid ${colors.mainRed};
        width: 100%;
    }

    h1 {
        font-size: 3em;
        
    }

    @media (max-width: 740px) {
        h1 {
            font-size: 1.7em;
        }
    }
`;

export const ChartBackground = styled.div`
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.mode === 'dark' ? colors.mainGrayLight : colors.mainWhiteDark};
    padding: 1em;
    border-radius: 0.5em;
    gap: 1em;
`;

export const Select = styled.select`
    appearance: none;
    background-color: ${props => props.theme.mode === 'dark' ? colors.darkBackground : colors.lightBackground};
    border: 2px solid ${props => props.theme.mode === 'dark' ? 'rgba(11, 11, 14, 0.6)' : 'rgba(120, 120, 135, 0.5)'};
    border-radius: 0.4em;
    padding: 0.2em 0.7em;
`;

export const OptionContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 0.2em;
    color: black;

`;

export const DriverContainer = styled.div`
    display: flex;
    align-items: start;
    justify-content: center;
    flex-direction: column;
    width: 100%;

    label {
        margin: 0 0 0.5em 0;
    }
`;
