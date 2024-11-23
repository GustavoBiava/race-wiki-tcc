import styled from 'styled-components';
import * as colors from '../../../config/colors';

export const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 90%;
`;

export const TitleHeader = styled.div`
    display: flex;
    align-items: start;
    flex-direction: column;
    width: 100%;
    margin: 0 0 1em 0;

    hr {
        border: 2.5px solid ${colors.mainRed};
        width: 100%;
    }

    h1 {
        font-size: 3em;
        
    }
`;

export const Form = styled.form`
    color: ${props => props.theme.mode === 'dark' ? colors.lightText : colors.darkText};
    width: 100%;

    input {
        all: unset;
        background-color: ${props => props.theme.mode === 'dark' ? colors.mainGray : colors.lightText};
        border: 2px solid ${props => props.theme.mode === 'dark' ? 'rgba(11, 11, 14, 0.6)' : 'rgba(120, 120, 135, 0.2)'};
        border-radius: 0.4em;
        height: 2.5em;
        padding: 0.2em 0.7em;
        margin: 0 0 1em 0;
    }

    input[type='file'] {
        display: none;
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

export const ImageInput = styled.label`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2em;
    margin: 0 0 0 0 !important;
    background-color: ${props => props.theme.mode === 'dark' ? colors.mainGray : colors.lightText};
    border: 2px solid ${props => props.theme.mode === 'dark' ? 'rgba(11, 11, 14, 0.6)' : 'rgba(120, 120, 135, 0.2)'};
    border-radius: 0.4em;
    min-height: 3em;
    padding: 0.2em 0.7em;
    cursor: pointer;

    &:hover {
        background-color: ${props => props.theme.mode === 'dark' ? colors.mainGrayLight : colors.mainWhiteDark};
    }

    img {
        max-height: 15em;
        max-width: 20em;
    }
`;

export const SelectImage = styled.label`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.2em;
    user-select: none;
`;  

export const ImageDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;