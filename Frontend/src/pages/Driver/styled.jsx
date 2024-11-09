import styled from "styled-components";
import * as colors from '../../config/colors';

export const Content = styled.div`
    width: 70vw;
    height: fit-content;
    margin: 7em 0;

    @media (max-width: 936px) {
        width: 95vw;
    }

`;

export const DriverContainer = styled.div`
    display: flex;
    flex-direction: row;
    background-color: ${props => props.theme.mode === 'dark' ? colors.mainGray : colors.mainWhite};
    border-radius: 0.5em;
    width: 100%;
    height: 100%; 

    @media (max-width: 936px) {
        flex-direction: column;
    }

`;

export const DriverDiv = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: fit-content;
`;

export const DriverBackground = styled.div`
    background-color: ${props => props.driverColor || '#1212ew'};
    width: 40vw;
    max-height: 55vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: end;
    border-radius: 0.5em 0 0 0;

    &:hover {
        filter: brightness(85%);
    }

    @media (max-width: 936px) {
        border-radius: 0.5em 0.5em 0 0;
        width: 95vw;
    }

`;

export const BackgroundImg = styled.img`
    object-fit: cover;
    z-index: 1;
    opacity: 0.45;
    width: 40vw;
    max-height: 55vh;
    border-radius: 0.5em 0 0 0;

    @media (max-width: 936px) {
        border-radius: 0.5em 0.5em 0 0;
        width: 95vw;
    }
`;

export const DriverImg = styled.img`
    object-fit: cover;
    z-index: 2;
    width: 100%;
    max-width: 27vw;
    max-height: 55vh;

    @media (max-width: 1227px) {
        max-width: 36vw;
    }

    @media (max-width: 936px) {
        max-width: 90vw;
    }

`;

export const DriverPicture = styled.div`
    position: absolute;
    display: grid;
    place-items: end;
`;

export const DriverFooter = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    width: 100%;
    padding: 0.5em 0.8em 1em;
    font-size: 1.6em;

    h2 {
        font-weight: 600;
        line-height: 0.6em;
    }

    @media (max-width: 936px) {
        padding: 0.5em 0.8em 0.7em;
    }

`;

export const DriverCountry = styled.div`
    display: flex;
    align-items: center;

    img {
        width: 1.5em;

        @media (max-width: 1385px) {
            width: 1.3em;
        }

        @media (max-width: 1200px) {
            width: 1.1em;
        }

        @media (max-width: 1060px) {
            width: 0.9em;
        }

    }
`;

export const DriverStats = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`;

export const DriverStatsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 1em 2.3em;

    @media (max-width: 1497px) {
        padding: 1em 1.1em;
    }

    @media (max-width: 936px) {
        padding: 0.5em 1.1em 0em;
    }

`;

export const DriverStatTable = styled.table`
    width: 100%;
    height: 100%;
    font-size: 1.1em;
    border-collapse: separate;

    @media (max-width: 1692px) {
        font-size: 0.9em;
    }

    @media (max-width: 1336px) {
        font-size: 0.8em;
    }

    @media (max-width: 1210px) {
        font-size: 0.7em;
    }

    @media (max-width: 1056px) {
        font-size: 0.6em;
    }

    @media (max-width: 936px) {
        font-size: 0.8em;
    }

`;

export const TdTitle = styled.h3`
    color: ${colors.mainRed};
    font-weight: 600;
`;

export const TdContent = styled.h3`
    font-weight: 600;
`;

export const DriverInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 0 0.4em;
`;

export const Number = styled.h3`
    color: ${props => props.color || '#757678'};
    font-size: 1.6em;
    font-weight: 600;
`;

export const DriverTeams = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 0 1em;
    padding: 0.5em 0.8em 1em;

    @media (max-width: 936px) {
        justify-content: start;
        padding: 0.5em 1.1em;
    }

`;

export const Team = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        filter: brightness(85%);
    }

`;

export const TeamCircle = styled.div`
    background-color: ${props => props.color || '#1212ew'};
    filter: grayscale(${props => !props.isActive ? 0.8 : 0});
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4em;
    height: 4em;
    border-radius: 100%;
    z-index: 1;

    @media (max-width: 1385px) {
        width: 3em;
        height: 3em;
    }

    @media (max-width: 1060px) {
        width: 2.5em;
        height: 2.5em;
    }

`;

export const TeamBackgroundImg = styled.img`
    opacity: 0.45;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    z-index: 1;
`;

export const TeamPicture = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
`;

export const TeamImg = styled.img`
    filter: grayscale(${props => !props.isActive ? 1 : 0});
    max-width: 3.5em;
    max-height: 2.5em;

    @media (max-width: 1385px) {
        max-width: 2.3em;
        max-height: 2.5em;
    }

    @media (max-width: 1200px) {
        max-width: 2em;
        max-height: 2.5em;
    }

    @media (max-width: 1060px) {
        max-width: 2em;
        max-height: 2em;
    }

`;