import styled from 'styled-components';
import * as colors from '../../config/colors';

export const TeamsContainer = styled.div`
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

export const AllTeams = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    min-width: 100%;
    place-items: center;
    gap: 3em 0;
`;

export const Team = styled.div``;

export const TeamBackground = styled.div`
    background-color: ${props => props.teamColor || '#1212ew'};
    min-width: 70vw;
    display: grid;
    place-items: center;
    height: 35vh;
    
    @media (max-width: 1165px) {
        width: 70vw;
        height: 40vh;
    }

    &:hover {
        filter: brightness(85%);
    }
`;

export const BackgroundImg = styled.img`
    display: block;
    z-index: 1;
    opacity: 0.45;
    width: 70vw;
    height: 35vh;

    @media (max-width: 1165px) {
        display: none;
        height: 40vh;
    }

`;

export const ResponsiveImg = styled.img`
    display: none;
    z-index: 1;
    opacity: 0.45;
    width: 70vw;

    @media (max-width: 1165px) {
        display: block;
        height: 40vh;
    }

`;

export const TeamImg = styled.img`
    z-index: 2;
    max-width: 20vw;
    max-height: 17em;

    @media (max-width: 900px) {
        max-width: 45vw;
    }

`;

export const TeamPicture = styled.div`
    position: absolute;
    display: grid;
    place-items: center;
`;

export const TeamHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 0 0.6em 0;
`;

export const TeamTitle = styled.h2`  
    font-size: 2em;

    @media (max-width: 515px) {
        font-size: 1.3em;
    }
`;

export const TeamCountry = styled.div`
    display: flex;
    align-items: center;

    img {
        width: 4em;
    }

`;

export const TeamInfo = styled.div`
    display: flex;
    align-items: center;
`;
