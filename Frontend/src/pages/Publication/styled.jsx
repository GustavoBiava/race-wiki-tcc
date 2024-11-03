import styled from "styled-components";

import * as colors from '../../config/colors'; 

export const Content = styled.div`
    width: 55vw;
    background-color: ${props => props.theme.mode === 'dark' ? colors.mainGray : colors.mainWhite};
    border-radius: 0.5em;
    margin: 7em 0;

    @media (max-width: 772px) {
        width: 90vw;
    }
`;

export const TitleHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;
    flex-direction: column;
    width: 100%;
    margin: 2em 0;

    hr {
        border: 2.5px solid ${colors.mainRed};
        width: 90%;
        margin: 0 0 1em 0;
    }

    h1 {
        font-size: 2.4em;
        max-width: 90%;
        margin: 0.3em 0;

        @media (max-width: 1015px) {
            font-size: 1.7em;
        
        }
    }

    @media (max-width: 1015px) {
        margin: 1em 0;
        
    }
    
`;

export const TitleDetails = styled.div`
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
        font-weight: 500;
        color: ${props => props.theme.mode === 'dark' ? colors.mainRed : colors.darkText};

        @media (max-width: 1468px) {
            font-size: 0.7em;
        }

    }

    span {
        color: ${props => props.theme.mode === 'dark' ? colors.lightText : colors.mainRed};
    }

    @media (max-width: 1015px) {
        flex-direction: column;
    }

`;

export const SwiperContainer = styled.div`
    color: ${colors.lightText};
`;

export const SwiperImgDiv = styled.div`
    display: grid;
    align-items: center;
`;

export const SwiperImg = styled.img`
    object-fit: cover;
    width: 100%;
    height: 60vh;

    @media (max-width: 1015px) {
        height: 40vh;
    }

    @media (max-width: 531px) {
        height: 35vh;
    }
`; 

export const Tags = styled.div`
    display: flex;
    width: 90%;
    justify-content: start;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5em;
`;

export const Tag = styled.div`
    background-color: ${colors.mainRed};
    width: fit-content;
    padding: 0.2em;
    border-radius: 0.3em;

    p {
        font-size: 0.7em;
        font-weight: 550;
        color: ${colors.lightText};
    }
`;

export const PublicationBodyContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2em 0 3em 0;

    @media (max-width: 1015px) {
        margin: 1em 0;
        
    }

`;

export const PublicationBody = styled.div`
    width: 90%;
    text-align: justify;
    font-size: 1em;
    font-weight: 540;
    
    @media (max-width: 1015px) {
        font-size: 0.9em;
        
    }
`;

export const CommentsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    margin: 0 0 2em 0;

    @media (max-width: 1015px) {
        margin: 0 0 1em 0;
        
    }
    
`;

export const CommentsHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;
    width: 90%;

    h1 {
        font-size: 2.3em;
        max-width: 90%;
        color: ${colors.mainRed};

        @media (max-width: 1015px) {
            font-size: 1.5em;
        
        }
    }
`;

export const CommentTextarea = styled.textarea`
    all: unset;
    background-color: ${props => props.theme.mode === 'dark' ? colors.mainGrayLight : colors.mainWhiteDark};
    width: 100%;
    border-radius: 0.3em;
    text-indent: 0.5em;
    overflow-wrap: break-word;
    height: 12em;
    padding: 0.5em;
    text-align: justify;
    box-sizing: border-box;
`;

export const CommentTitle = styled.input`
    all: unset;
    background-color: ${props => props.theme.mode === 'dark' ? colors.mainGrayLight : colors.mainWhiteDark};
    width: 100%;
    border-radius: 0.3em;
    text-indent: 0.5em;
    overflow-wrap: break-word;
    padding: 0.5em;
    text-align: justify;
    box-sizing: border-box;
`;

export const WriteSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
    flex-direction: column;
    gap: 1em 0;
    width: 90%;
    margin: 0em 0 3em 0;

    @media (max-width: 1015px) {
        margin: 0em 0 2em 0;
        
    }
`;

export const TextLabel = styled.div`
    width: 100%;

    label {
        font-weight: 550;

        @media (max-width: 1015px) {
            font-size: 0.8em;
        }
    }
`;

export const ButtonDiv = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: end;

    button {
        max-width: fit-content;
        height: fit-content;
        padding: 0.7em;

        @media (max-width: 800px) {
            max-width: 100%;
        }

    }

    @media (max-width: 800px) {
        display: flex;
        align-items: center;
        justify-content: center;
    }

`;

export const PublicationComments = styled.div`
    width: 90%;

`;

export const Comment = styled.div`
    width: 100%;
    background-color: ${props => props.theme.mode === 'dark' ? colors.mainGrayLight : colors.mainWhiteDark};
    padding: 1em;
    border-radius: 0.3em;
`;

export const CommentHeader = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    gap: 0.7em;
    
    h2 {
        font-size: 1.1em;
        font-weight: 560;
    }
`;

export const UserProfile = styled.div`
    background-color: ${props => props.color || '#1212ew'};
    width: 2.3em;
    height: 2.3em;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;    
`;

export const BackgroundImg = styled.img`
    opacity: 0.45;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    z-index: 1;
`;

export const DriverPicture = styled.img`
    object-fit: cover;
    position: absolute;
    width: 2.5em;
    height: 2.5em;
    border-radius: 100%;
    z-index: 2;
    border: 2px solid ${colors.mainRed};
`;

export const CommentBody = styled.div`
    margin: 0.6em 0;

    h2 {
        color: ${colors.mainRed};

        @media (max-width: 1015px) {
            font-size: 1.3em;
        
        }

    }

    p {
        text-align: justify;
        @media (max-width: 1015px) {
            font-size: 0.8em;
        
        }
    }

`;

export const CommentFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const SeeReponses = styled.details`
    summary {
        list-style: none;
    }
`;

