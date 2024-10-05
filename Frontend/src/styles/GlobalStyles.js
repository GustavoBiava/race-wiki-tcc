import { createGlobalStyle } from 'styled-components';

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
        background-color: ${props => props.theme.mode === 'dark' ? colors.darkBackground : colors.lightText};
        color: ${props => props.theme.mode === 'dark' ? colors.lightBackground : colors.darkText};
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