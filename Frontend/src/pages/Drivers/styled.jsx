import styled from 'styled-components';
import * as colors from '../../config/colors';

export const DriversContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    min-width: 70vw;
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
        margin: 3em 0 0.1em 0;
        
    }
    
    @media (max-width: 890px) {
        align-items: center;
    }
    
    @media (max-width: 740px) {
        h1 {
            font-size: 1.7em;
            margin: 5em 0 0 0;
        }
    }

`;

export const AllDrivers = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    min-width: 100%;
    place-items: center;
    gap: 3em 3.5em;
    

    @media (max-width: 1165px) {
        grid-template-columns: 1fr;
        gap: 3em 0;
    }
`;

export const Driver = styled.div``;

export const DriverBackground = styled.div`
    background-color: ${props => props.driverColor || '#1212ew'};
    width: 23vw;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: end;
    
    @media (max-width: 1165px) {
        width: 70vw;
    }

    &:hover {
        filter: brightness(85%);
    }
`;

export const BackgroundImg = styled.img`
    z-index: 1;
    opacity: 0.45;
    width: 23vw;

    @media (max-width: 1165px) {
        width: 70vw;
    }
`;

export const DriverImg = styled.img`
    z-index: 2;
    width: 24vw;

    @media (max-width: 1165px) {
        width: 70vw;
    }

`;

export const DriverPicture = styled.div`
    position: absolute;
    display: grid;
    place-items: end;
`;

export const DriverHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 0 0.6em 0;
`;

export const DriverName = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
`;

export const Name = styled.p`
    font-weight: normal;
    font-size: 1em;
`;

export const Surname = styled.h2`  
    line-height: 0.9em;
    font-size: 2em;

    @media (max-width: 1474px) {
        font-size: 1.4em;
    }
`;

export const Number = styled.h2`
    color: ${props => props.color || '#757678'};
    font-size: 2.9em;
    margin: 0 0.2em 0 0;
`;

export const DriverCountry = styled.div`
    display: flex;
    align-items: center;

    img {
        width: 4em;
    }

`;

export const DriverInfo = styled.div`
    display: flex;
    align-items: center;
`;