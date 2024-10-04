import { createGlobalStyle } from 'styled-components';

import * as colors from '../config/colors';

export default createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        outline: none;
        box-sizing: border-box;
        transition: all 0.1s;
        font-family:  sans-serif;
        transition: all 0.2s;
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
`;