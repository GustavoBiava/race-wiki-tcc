import styled from 'styled-components';

import * as colors from '../../config/colors'; 

export const Content = styled.div`
    min-width: 80vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const SwiperContainer = styled.div`
    margin: 5em 0 0em 0;;
    width: 100vw;
    color: ${colors.lightText};

`;

export const TitleHeader = styled.div`
    display: flex;
    align-items: start;
    flex-direction: column;
    width: 80vw;
    margin: 7em 0 4em 0;

    hr {
        border: 2.5px solid ${colors.mainRed};
        width: 100%;
    }

    h1 {
        font-size: 3em;
        
    }
    
    @media (max-width: 890px) {
        text-align: center;
        align-items: center;
        margin: 5em 0 2em 0;
    }
    
    @media (max-width: 740px) {
        h1 {
            font-size: 1.7em;
        }
    }
`;

export const SwiperImgDiv = styled.div`
    cursor: pointer;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: start;
    z-index: 2;
`;

export const RaceInfo = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    z-index: 1;
    text-align: center;

    h1 {
        font-size: 4em;
        max-width: 90vw;

        @media (max-width: 740px) {
            font-size: 3.2em;
        }
    }

    h2 {
        font-size: 1em;
        margin: 0 0 0.5em 0;

        @media (max-width: 740px) {
            font-size: 0.7em;
        }

    }
`;

export const SwiperImg = styled.img`
    filter: blur(1.2px) brightness(40%);
    object-fit: cover;
    width: 100%;
    height: 60vh;
`; 

export const RacePlace = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Country = styled.img`
    width: 3em;
    margin: 0 0 0 0.5em
`;

export const Publications = styled.div`
    min-width: 80vw;
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: space-between;
    place-items: center;
    gap: 4em 0em;

    @media (max-width: 879px) {
        grid-template-columns: 1fr;
        gap: 2em 0em;
    }
`;

export const Publication = styled.div`
    background-color: ${props => props.theme.mode === 'dark' ? colors.mainGray : colors.mainWhite};
    display: flex;
    align-items: center;
    max-width: 30vw;
    border-radius: 0.2em;
    z-index: 1;

    @media (max-width: 1380px) {
        h2 {
            font-size: 1.2em;
        }        

        p {
            font-size: 0.7em;
        }
    }

    @media (max-width: 879px) {
        max-width: 80vw;
    }
`;

export const PublicationImg = styled.img`
    object-fit: cover;
    width: 30vw;
    max-height: 30vh;
    border-radius: 0.2em 0.2em 0 0;
    z-index: 2;

    @media (max-width: 879px) {
        width: 80vw;
    }

    &:hover {
        filter: brightness(85%);
    }
`;

export const PublicationFooter = styled.div`
    width: 100%;
    padding: 0.5em 1em 1em 1em;
    z-index: 2;

    h2 {
        color: ${props => props.theme.mode === 'dark' ? colors.lightBackground : colors.mainRed};
    }
`;

export const PublicationDetails = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 2em 0 0 0;
    font-weight: 550;

    p {
        color: ${props => props.theme.mode === 'dark' ? colors.mainRed : colors.darkText};
    }

    span {
        color: ${props => props.theme.mode === 'dark' ? colors.lightText : colors.mainRed};
    }
`;

export const Tags = styled.div`
    position: absolute;
    display: flex;
    width: 30vw;
    justify-content: end;
    align-items: center;
    flex-wrap: wrap;
    padding: 0.5em;
    gap: 0.5em;
    z-index: 3;

    @media (max-width: 879px) {
        width: 80vw;
    }

`;

export const Tag = styled.div`
    background-color: ${colors.mainRed};
    width: fit-content;
    padding: 0.2em;
    border-radius: 0.3em;

    p {
        font-size: 0.9em;
        font-weight: 550;
    }

    @media (max-width: 879px) {
        font-size: 0.8em;
    }
`;

export const ClassificationLeaders = styled.div`
    width: 80vw;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1em;
    margin: 4em 0 0 0;

    @media (max-width: 1148px) {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2em 0;
    }

    @media (max-width: 856px) {
        margin: 1.5em 0 0 0;
    }

    @media (max-height: 600px) and (max-width: 1024px){
        gap: 6em 1em;
    }

`;

export const Leader = styled.div`
    background-color: ${props => props.theme.mode === 'dark' ? colors.mainGray : colors.mainWhite};
    width: fit-content;
    border-radius: 0.2em;

    @media (max-width: 1148px) {
        width: 80vw;
    }
`;

export const BackgroundImg = styled.img`
    object-fit: cover;
    width: 23vw;
    height: 20vh;
    z-index: 1;
    opacity: 0.45;
    border-radius: 0.2em 0.2em 0 0;

    @media (max-width: 1148px) {
        width: 80vw;
    }
`;

export const DriverBackground = styled.div`
    background-color: ${props => props.driverColor || '#1212ew'};
    width: 23vw;
    height: 20vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: end;
    border-radius: 0.2em;

    &:hover {
        filter: brightness(85%);
    }

    @media (max-width: 1148px) {
        width: 80vw;
    }
`;

export const DriverImg = styled.img`
    position: absolute;
    z-index: 2;
    max-width: 16em;
    max-height: 18em;
    
    @media (max-width: 1148px) {
        width: 20vw;
    }
    
    @media (max-width: 856px) {
        width: 30vw;
    }
    
    @media (max-width: 475px) {
        width: 45vw;
    }
`;

export const LeaderDetails = styled.div`
    display: flex;
    align-items: center;
    padding: 0.7em;
`;

export const Name = styled.p`
    font-weight: normal;
    font-size: 1em;
`;

export const Surname = styled.h2`  
    line-height: 0.9em;
    font-size: 2em;
`;

export const NameCointainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    color: ${props => props.theme.mode === 'dark' ? colors.lightText : colors.darkText};

    @media (max-width: 1480px) {
        h2 {
            font-size: 1.2em;
        }        

        p {
            font-size: 0.7em;
        }
    }
`;

export const Number = styled.h2`
    color: ${props => props.color || '#757678'};
    font-size: 2.9em;
    margin: 0 0.2em 0 0;
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
    
    @media (max-width: 1692px) {
        font-size: 1.5em;
    }
`;

export const DriversTable = styled.table`
`;

