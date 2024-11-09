import styled from "styled-components";
import * as colors from '../../config/colors';

export const Content = styled.div`
    width: 70vw;
    height: fit-content;
    margin: 7em 0;

    @media (max-width: 912px) {
        width: 95vw;
    }

`;

export const RaceContainer = styled.div`
    display: flex;
    flex-direction: row;
    background-color: ${props => props.theme.mode === 'dark' ? colors.mainGray : colors.mainWhite};
    border-radius: 0.5em;
    width: 100%;
    height: 100%; 
    margin: 0 0 1em 0;

    @media (max-width: 912px) {
        flex-direction: column;
    }

`;

export const Country = styled.img`
    width: 1.5em;
    margin: 0 0 0 0.5em;
`;

export const CountryDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const SwiperContainer = styled.div`
    width: 60%;
    color: ${colors.lightText};

    @media (max-width: 912px) {
        width: 100%;
    }

`;

export const SwiperImg = styled.img`
    object-fit: cover;
    width: 100%;
    height: 45vh;
    border-radius: 0.5em 0 0 0;

    @media (max-width: 912px) {
        height: 30vh;
        border-radius: 0.5em 0.5em 0 0;
    }

`; 

export const SwiperImgDiv = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: start;
    z-index: 2;
    border-radius: 0.5em 0 0 0;

    @media (max-width: 912px) {
        border-radius: 0.5em 0.5em 0 0;
    }
`;

export const RaceFooter = styled.div`
    display: flex;
    align-items: center;
    padding: 0.5em 0.8em 0;
    width: 100%;
    font-size: 1.7em;
    margin: 0 0 0.3em 0;

    h2 {
        font-weight: 700;
        color: ${props => props.theme.mode === 'dark' ? colors.lightBackground : colors.darkText};
    }

    @media (max-width: 1649px) {
        font-size: 1.4em;
    }

    @media (max-width: 1365px) {
        font-size: 1.2em;
    }

    @media (max-width: 1205px) {
        font-size: 1.2em;
    }

    @media (max-width: 1168px) {
        font-size: 1em;
    }

    @media (max-width: 970px) {
        font-size: 0.9em;
    }

    @media (max-width: 912px) {
        font-size: 1.4em;
        padding: 0.5em 0.8em 0;
    }

    @media (max-width: 598px) {
        font-size: 1.1em;
        padding: 0.5em 0.8em 0;
    }

`;

export const RaceStats = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 1em 1em;

    @media (max-width: 1234px) {
        padding: 0.5em 0em 0.5em 0.5em;
    }

    @media (max-width: 912px) {
        padding: 0 0.3em;
    }

`;

export const RaceStatsContainer = styled.div`
    width: 100%;
    height: 100%;
`;

export const RaceStatTable = styled.table`
    width: 100%;
    height: 100%;
    font-size: 1em;
    
    @media (max-width: 1574px) {
        font-size: 0.8em;
    }

    @media (max-width: 1234px) {
        font-size: 0.6em;
    }

    @media (max-width: 912px) {
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

export const TitleHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    margin: 2em 0 1em 0;
    text-align: center;

    hr {
        border: 2.5px solid ${colors.mainRed};
        width: 90%;
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
    }
    
    tr:nth-child(even) {
        background: ${props => props.theme.mode === 'dark' ? colors.mainGrayLight : colors.mainWhiteDark};
    }
`;

export const PosistionTd = styled.td`
    width: 3em;
    text-align: center;
`;

export const NameTd = styled.td`
    text-align: left;
`;

export const NameTableDiv = styled.div`
    display: flex;
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

export const ResultContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.mode === 'dark' ? colors.mainGray : colors.mainWhite};
    border-radius: 0.5em;
    width: 100%;
    height: 100%; 
    margin: 0 0 1em 0;

    @media (max-width: 912px) {
        flex-direction: column;
    }
`;

export const ClassificationLeaders = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1em;
    margin: 0.6em 0 0.5em 0;
    width: 90%;

    @media (max-width: 1148px) {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1em 0;
    }

    @media (max-width: 856px) {
        margin: 1em 0 1em 0;
    }

    @media (max-height: 600px) and (max-width: 1024px){
        gap: 6em 1em;
    }

`;

export const Leader = styled.div`
    background-color: ${props => props.theme.mode === 'dark' ? colors.darkBackground : colors.lightBackground};
    width: fit-content;
    border-radius: 0.2em;

    @media (max-width: 1148px) {
        width: 100%;
    }
`;

export const DriverBackground = styled.div`
    background-color: ${props => props.driverColor || '#1212ew'};
    width: 20.4vw;
    height: 20vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: end;
    border-radius: 0.2em 0.2em 0 0;

    @media (max-width: 1148px) {
        width: 100%;
    }

    &:hover {
        filter: brightness(85%);
    }
`;

export const LeaderImg = styled.img`
    position: absolute;
    z-index: 2;
    max-width: 16em;
    max-height: 20vh;
`;

export const BackgroundImg = styled.img`
    object-fit: cover;
    z-index: 1;
    opacity: 0.45;
    width: 100%;
    height: 100%;
    border-radius: 0.2em 0.2em 0 0;
`;

export const LeaderDetails = styled.div`
    display: flex;
    align-items: center;
    padding: 0.7em;
`;

export const Number = styled.h2`
    color: ${props => props.color || '#757678'};
    font-size: 2.9em;
    margin: 0 0.2em 0 0;
`;

export const NameCointainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    color: ${props => props.theme.mode === 'dark' ? colors.lightText : colors.darkText};
    white-space: nowrap;

    @media (max-width: 1739px) {
        h2 {
            font-size: 1.5em;
        }        

        p {
            font-size: 0.7em;
        }
    }

    @media (max-width: 1394px) {
        h2 {
            font-size: 1em;
        }        
    }

    @media (max-width: 1141px) {
        h2 {
            font-size: 1.5em;
        }        

        p {
            font-size: 0.7em;
        }
    }
`;

export const LeaderName = styled.div`
    display: flex;
    align-items: center;

    img {
        margin: 0 0 0 0.3em;
        width: 1.2em;
        
        @media (max-width: 1480px) {
            width: 1em;
        }
    }

`;

export const Name = styled.p`
    font-weight: normal;
    font-size: 1em;
`;

export const Surname = styled.h2`  
    line-height: 0.9em;
    font-size: 2em;
`;

export const PointsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
    width: 100%;
`;

export const Points = styled.h2`
    color: ${props => props.color || '#757678'};
    font-size: 2.3em;
    
    @media (max-width: 1810px) {
        font-size: 2em;
    }

    @media (max-width: 1525px) {
        font-size: 1.5em;
    }
`;