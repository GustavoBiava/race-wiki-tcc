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

export const AdminContainer = styled.div`
    position: absolute;
    width: 85vw;
    min-height: 100vh;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const Button = styled.button`
    all: unset;
    display: flex;
    align-items: center;
    justify-content: center;
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

export const Table = styled.table`
    width: 100%;
    border-radius: 0.5em;
    border-collapse: collapse;
    background: ${props => props.theme.mode === 'dark' ? colors.mainGray : colors.mainWhite};
    text-align: center;

    th {
        height: 3.5em;
        font-weight: 650;
        padding: 1em;
        font-size: 1.1em;
        border-radius: 1em;
    }
    
    tr {
        height: 1em;
    }
    
    td {
        padding: ${props => props.isResult ? '1em' : '0.23em'};
        font-weight: 500;
    }

    input {
        height: 2em;
    }

    tr:nth-child(even) {
        background-color: ${props => props.theme.mode === 'dark' ? colors.mainGrayLight : colors.mainWhiteDark};
    }

`;