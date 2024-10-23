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
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: start;
    filter: brightness(50%);
`;

export const RaceInfo = styled.div`

`;

export const SwiperImg = styled.img`
    object-fit: cover;
    width: 100%;
    height: 60vh;
`; 