import styled from 'styled-components';
import * as colors from '../../config/colors';

export const DriversContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 60vw;
`;

export const DriversHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
    width: 100%;

    hr {
        border: 2px solid ${colors.mainRed};
        width: 100%;
    }

    h1 {
        font-size: 3em;
    }

    @media (max-width: 746px) {
        h1 {
            font-size: 1em;
            text-align: center;
        }
    }
`;

export const AllDrivers = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 5em;
    
    @media (max-width: 746px) {
        grid-template-columns: 1fr;
        gap: 0;
    }
`;

export const Driver = styled.div`

`;

export const DriverBackground = styled.div`
    background-color: ${props => props.driverColor || '#757678'};
    width: 23vw;
    
    img {
        z-index: 2;
        opacity: 0.5;
        width: 23vw;
    }
`;

export const DriverHeader = styled.div`
    display: flex;

`;

export const DriverName = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
`;