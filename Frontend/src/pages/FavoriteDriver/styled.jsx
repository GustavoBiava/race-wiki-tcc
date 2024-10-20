import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Content = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    min-width: 70vw;
`;

export const TitleHeader = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    margin: 0 0 5em 0;
    width: 100%;

    hr {
        border: 2.5px solid ${colors.mainRed};
        width: 100%;
    }

    h1 {
        font-size: 3em;
        margin: 2em 0 0.1em 0;        
    }
    
    @media (max-width: 859px) {
        margin: 0 0 2em 0;
        h1 {
            font-size: 1.3em;
            margin: 5em 0 0 0;
        }
    }

`;

export const Drivers = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-width: 100%;
    place-items: center;
    column-gap: -100em;
    cursor: pointer;

    @media (max-width: 980px) {
        gap: 2em;
    }
`;

export const Driver = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0.2em;
    border-radius: 100%;
`;

export const DriverCircle = styled.div`
    background-color: ${props => props.color || '#1212ew'};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 17em;
    height: 17em;
    border-radius: 100%;
    z-index: 1;

    @media (max-width: 859px) {
        width: 9em;
        height: 9em;
    }

    &:hover {
        filter: brightness(85%);
    }
`;

export const BackgroundImg = styled.img`
    opacity: 0.45;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    z-index: 1;
`;

export const DriverPicture = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
`;

export const DriverImg = styled.img`
    width: 17em;
    border-radius: 50%;

    @media (max-width: 859px) {
        width: 9em;
    }

`;

export const DriverName = styled.div`
    margin: 0.3em 0 0 0;
`;

export const Name = styled.h1`
    font-weight: 500;
    font-size: 1.3em;
`;

export const ButtonDiv = styled.div`
    margin: 4em 0 0 0;
    min-width: 40vw;

    @media (max-width: 859px) {
        margin: 2.5em 0 0 0;
    }
`;

export const DriverContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .selected {
        border: 3px solid;
        border-color: ${props => props.color || '#1212ew'};

        & + div {
            color: ${props => props.color || '#1212ew'};
        }
    }
`;