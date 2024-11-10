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

export const TeamContainer = styled.div`
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

export const TeamDiv = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: fit-content;
`;

export const TeamBackground = styled.div`
    background-color: ${props => props.teamColor || '#1212ew'};
    width: 40vw;
    max-height: 55vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
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

export const TeamImg = styled.img`
    object-fit: cover;
    z-index: 2;
    width: 100%;
    max-width: 27vw;
    max-height: 40vh;

    @media (max-width: 1227px) {
        max-width: 36vw;
    }

    @media (max-width: 936px) {
        max-width: 70vw;
    }

`;

export const TeamPicture = styled.div`
    position: absolute;
    display: grid;
    place-items: end;
`;

export const TeamFooter = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: start;
    width: 100%;
    padding: 1em 0.8em 1em;
    font-size: 1.6em;
    gap: 0.5em;

    h2 {
        font-weight: 600;
        line-height: 0.6em;

        @media (max-width: 936px) {
            line-height: 1em;
        }

    }

    @media (max-width: 936px) {
        padding: 0.5em 0.8em 0em;
    }

`;

export const TeamCountry = styled.div`
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

export const TeamStats = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 0.3em 0.7em 1em 0.7em;
`;

export const TeamStatsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;

`;

export const TeamStatTable = styled.table`
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

export const TeamInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 0 0.4em;
`;

export const DriverTeams = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 0 1em;
    margin: 0.5em 0 0 0;

    @media (max-width: 936px) {
        justify-content: center;
    }

`;

export const Driver = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        filter: brightness(85%);
    }

`;

export const DriverCircle = styled.div`
    background-color: ${props => props.color || '#1212ew'};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4.3em;
    height: 4.3em;
    border-radius: 100%;
    z-index: 1;

    @media (max-width: 1385px) {
        width: 3em;
        height: 3em;
    }

    @media (max-width: 936px) {
        width: 4em;
        height: 4em;
    }

`;

export const TeamBackgroundImg = styled.img`
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
    border-radius: 100%;
    max-width: 4.3em;
    max-height: 4.3em;

    @media (max-width: 1385px) {
        max-width: 3em;
        max-height: 3em;
    }

    @media (max-width: 936px) {
        max-width: 4em;
        max-height: 4em;
    }

`;

export const SectionContainer = styled.div`
    margin: 1em 0 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${props => props.theme.mode === 'dark' ? colors.mainGray : colors.mainWhite};
    border-radius: 0.5em;
    width: 100%;
    height: 100%; 

`;

export const TitleHeader = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 90%;
    margin: 2em 0 1em 0;
    text-align: center;

    hr {
        border: 2.5px solid ${colors.mainRed};
        width: 100%;
    }

    h1 {
        font-size: 2.5em;
    }
    
    @media (max-width: 740px) {

        margin: 1.5em 0 1em 0;

        h1 {
            font-size: 1.7em;
        }
    }
`;

export const DriverDescription = styled.div`
    width: 90%;
    text-align: justify;
    font-size: 1em;
    font-weight: 540;
    margin: 0 0 2em 0;
    
    @media (max-width: 936px) {
        font-size: 0.9em;
        
    }
`;

export const ResultsTable = styled.table`
    width: 100%;
    font-weight: bold;
    background: ${props => props.theme.mode === 'dark' ? colors.darkBackground : colors.lightBackground};
    border-radius: 0.2em;
    font-size: 1.1em;
    text-align: center;
    font-weight: 500;

    th {
        text-align: center;
        padding: 0.5em;

        @media (max-width: 1298px) {
            font-size: 0.8em;
        }

    }

    tr {
        height: 2.5em;
        cursor: pointer;

        @media (max-width: 1298px) {
            font-size: 0.8em;
        }

        @media (max-width: 499px) {
            font-size: 0.7em;
        }


        
        &:hover {
            filter: brightness(85%);
        }
    }

    td {
        padding: 0.1em;
        width: fit-content;
    }
    
    tr:nth-child(even) {
        background: ${props => props.theme.mode === 'dark' ? colors.mainGrayLight : colors.mainWhiteDark};
    }
`;

export const NameTd = styled.td`
    text-align: center;
`;

export const NameTableDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    h3 {
        font-size: 1em;
        font-weight: 500;
    }
    
    h3 {
        margin: 0 0 0 0.3em;
    }

`;

export const ColorDetail = styled.div`
    background-color: ${props => props.color || '#757678'};
    width: 0.21em;
    height: 1.3em;
    margin: 0 0.2em 0 0;
`;

export const PointsTd = styled.td`
    width: 5em;    
    text-align: center;
`;

export const TableContainer = styled.div`
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.5em 0 2em 0;

    @media (max-width: 740px) {
        margin: 0 0 1em 0;
    }

`;

export const ResponsiveTd = styled.td`

    @media (max-width: 738px) {
        display: none;
    }
    
`;

export const ResponsiveTh = styled.th`

    @media (max-width: 738px) {
        display: none;
    }

`;