import styled, { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import 'swiper/css/bundle';

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
        --swiper-navigation-color: ${colors.lightText};
        --swiper-pagination-color: ${colors.lightText};
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

    .Toastify__toast {
        background-color: ${colors.secondGray} !important; 
        color: ${colors.lightText} !important;
    }

    .swiper-button-prev, .swiper-button-next {
        color: ${colors.lightText};
        filter: opacity(0.7);

        &:hover {
            color: ${colors.mainRed};
        }
    }

    .swiper-pagination {
        margin: 0 0 0.3em 0;
    }

    .swiper-pagination-bullet {
        background-color: ${colors.lightText};
        filter: opacity(0.7);

        &:hover {
            background-color: ${colors.mainRed};
            filter: opacity(0.7);
        }
    }

    .swiper-pagination-bullet-active {
        background-color: ${colors.mainRed};
        filter: opacity(0.7);
    }

    .swiper-button-disabled {
        filter: opacity(0.5);
    }
`;

export const Container = styled.div`
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
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