import styled from 'styled-components';

import * as colors from '../../config/colors';

export const Navbar = styled.nav`
    background-color: ${colors.mainRed};
    color: ${colors.lightText};
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: 'Outfit';
    font-size: 1em;

  
    @media (max-width: 890px) {
        display: flex;
        justify-content: space-between;
    }

`;

export const NavLogo = styled.div`
    margin: 0 1em;

    img {
        width: 6em; 
        height: 6em;
    }
`;

export const NavItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.2em;

    &:hover {
        background-color: white;
    }

`;

export const NavGroup = styled.div`

    margin: 0 0.5em;
    display: flex;

    .NavItems {
        display: flex;
        margin: 0 1em;
        gap: 1em;
        justify-content: center;
        align-items: center;
    }

    .Menu {
        margin: 0 1em;
        display: none;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .LoginLink {
        background-color: ${colors.mainGray};
        padding: 0.3em;
        border-radius: 0.4em;
        cursor: pointer;
        padding: 0.5em;
        
        &:hover {
            background-color: ${colors.mainGrayLight};
        }

    }

    @media (max-width: 890px) {
        .NavItems {
            display: none;
        }

        .Menu {
            display: block;
        }
    }

`;