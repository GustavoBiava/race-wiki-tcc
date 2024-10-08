import styled from 'styled-components';

import * as colors from '../../../config/colors';

export const Form = styled.form`
    color: ${props => props.theme.mode === 'dark' ? colors.lightText : colors.darkText};
    width: 60vw;
    max-width: 50em;

    input[type="text"], input[type="password"], input[type="email"], input[type="date"] {
        all: unset;
        background-color: ${props => props.theme.mode === 'dark' ? colors.darkBackground : colors.lightText};
        border: 1px solid ${props => props.theme.mode === 'dark' ? colors.lightText : colors.darkBackground};
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
        border: 1px solid ${colors.mainRed};
        width:100%;
        margin: 1em 0;
    }

    h1 {
        font-size: 2em;
        text-align: center;
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

    span {
        text-decoration: underline ${colors.mainRed};
        text-underline-offset: 0.2vw;
        text-decoration-thickness: 1px;
        color: ${colors.mainRed};
    }


`;

export const FormButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1.5em 0;
`;

export const TermsDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;
    margin: 1.5em 0 0 0;

    p {
        margin: 0 0 0 0.5em;
    }
`;  

