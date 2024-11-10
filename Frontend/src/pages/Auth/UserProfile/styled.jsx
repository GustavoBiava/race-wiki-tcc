import styled from "styled-components";
import * as colors from '../../../config/colors';

export const Content = styled.div`
    width: 70vw;
    height: fit-content;
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 1em 0;
    margin: 7em 0;
`;

export const ProfileContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.mode === 'dark' ? colors.mainGray : colors.mainWhite};
    border-radius: 0.5em;
    width: 100%;
    height: 100%; 
    padding: 3em;
`;

export const UserContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${props => props.theme.mode === 'dark' ? colors.mainGray : colors.mainWhite};
    border-radius: 0.5em;
    width: 100%;
    height: 100%; 
    padding: 1em;
`;

export const Form = styled.form`
    color: ${props => props.theme.mode === 'dark' ? colors.lightText : colors.darkText};
    width: 100%;

    input {
        all: unset;
        background-color: ${props => props.theme.mode === 'dark' ? colors.mainGrayLight : colors.lightText};
        border: 2px solid ${props => props.theme.mode === 'dark' ? 'rgba(11, 11, 14, 0.6)' : 'rgba(120, 120, 135, 0.2)'};
        border-radius: 0.4em;
        height: 2.5em;
        padding: 0.2em 0.7em;
        margin: 0 0 1em 0;
    }
`;

export const FormHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    hr {
        border: 2px solid ${colors.mainRed}; 
        width: 100%;
        margin: 0.5em 0 1em 0;
    }

    h1 {
        font-size: 2em;
        text-align: start;
        width: 100%;
    }

    @media (max-width: 890px) {
        font-size: 1em;
    }
`;

export const FormBody = styled.div`
    display: flex;
    flex-direction: column;

    label {
        margin: 0.5em 0;
    }
`;

export const FormButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1em 0;
`;

export const ProfileCircle = styled.div`
    background-color: ${props => props.color || '#1212ew'};
    width: 7em;
    height: 7em;
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
    width: 7em;
    height: 7em;
    border-radius: 100%;
    z-index: 2;
    border: 2px solid ${colors.mainRed};
`;

export const ButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 1em;

    button {
        max-width: fit-content;
        height: fit-content;
        padding: 0.7em;
    }

`;

export const ProfileDiv = styled.div`
    display: flex;
    align-items: center;
    gap: 1em;
`;

export const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 0.7em;
    
    h1 {
        font-weight: 700;
    }

    h2 {
        color: ${props => props.theme.mode === 'dark' ? colors.thirdGray : colors.thirdGray};
        font-weight: 640;
        line-height: 1em;
    }

`;
