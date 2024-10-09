import styled from 'styled-components';
import * as colors from '../../config/colors'; 

export const FooterContainer = styled.div`
    background-color: ${colors.secondGray};
    width: 100%;
    height: auto;
    padding: 2em 2em 1em 2em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 3vw 0 0 0;

    @media (max-width: 965px) {
        flex-direction: column;
        gap: 1.5em;
    }
`;

export const FooterDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start !important;
    align-items: center;

    p {
        font-size: 0.7em;
        color: ${colors.lightText};
        max-width: 30em;
        text-align: justify;
    }

    h2 {
        color: ${colors.mainRed};
    }
`;

export const BrandLogo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
        width: 11em;
    }
    
    h5 {
        color: ${colors.mainRed};
        margin: 0.5em 0 0 0;
    }
`;

export const SocialMediaContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5vw;
    margin: 1.2em 0;
`;

export const SocialMedia = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid ${colors.lightText};
    border-radius: 100% ;
    padding: 0.3em;
    color: ${colors.lightText};
    cursor: pointer;

    &:hover {
        background-color: ${colors.mainRed};
    }
`;

export const LinksList = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    li:hover {
        color: ${colors.mainRed};
    }

`;

export const ResponsiveHr = styled.hr`
    display: none;
    border: 1px solid ${colors.mainGrayLight};
    width:100%;

    @media (max-width: 965px) {
        display: block;
    }

`;