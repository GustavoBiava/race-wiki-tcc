import styled, { createGlobalStyle } from 'styled-components';

import * as colors from '../config/colors';

export default createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        outline: none;
        box-sizing: border-box;
        transition: all 0.2s;
        font-family: 'Poppins';
    }
    
    body {
        scrollbar-width: none;
        -ms-overflow-style: none;
        background-color: ${props => props.theme.mode === 'dark' ? colors.darkBackground : colors.lightText};
        color: ${props => props.theme.mode === 'dark' ? colors.lightBackground : colors.darkText};
    }

    ::-webkit-scrollbar {
        display: none;
    }   

    html, body, #root {
        height: 100%;
    }

    button {
        cursor: pointer;
    }

    a {
        text-decoration: none;
        outline: none;
        font-weight: normal;
        color: ${colors.lightText};
    }

    ul {
        list-style: none;
    }

    .navbar-responsive {
        background-color: ${colors.mainRed};
        color: ${colors.lightText};
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        font-size: 0.8em;

        .NavItems {
            display: block;
        }

        .Menu {
            display: block;
        }

        .Login {
            margin: 1em 0;
        }
    }

`;

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: grid;
    place-items: center;
    justify-content: center;
    align-items: center;
`;

export const Button = styled.button`
    all: unset;
    background-color: ${colors.mainRed};
    text-align: center;
    border-radius: 0.3em;
    width: 100%;
    height: 2.3em;
    padding: 0.2em;
    font-weight: bold;
    color: ${colors.lightText};
    cursor: pointer;

    &:hover {
        background-color: ${colors.secondRed};
    }
`;