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
    margin: 3em 0 0 0;;
    width: 100vw;
    color: ${colors.lightText};

`;

export const TitleHeader = styled.div`
    display: flex;
    align-items: start;
    flex-direction: column;
    width: 80vw;
    margin: 4em 0 0 0;

    hr {
        border: 2.5px solid ${colors.mainRed};
        width: 100%;
    }

    h1 {
        font-size: 3em;
        
    }
    
    @media (max-width: 890px) {
        align-items: center;
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
    filter: blur(1px) brightness(50%);
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