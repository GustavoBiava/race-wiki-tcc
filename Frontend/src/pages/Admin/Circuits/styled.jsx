import styled from "styled-components";
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

    hr {
        border: 2.5px solid ${colors.mainRed};
        width: 100%;
    }

    h1 {
        font-size: 3em;
        
    }
`;

export const Container = styled.div`
    margin: 2.5em 0 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
`;

export const ButtonDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.7em;

    button {
        width: 4.5em;
        height: 2.5em;
    }
`;

export const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: end;
    margin: 2em 0;

    button {
        width: fit-content;
        padding: 0.6em;
    }

`;