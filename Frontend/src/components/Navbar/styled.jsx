import styled from 'styled-components';

import * as colors from '../../config/colors';

export const Navbar = styled.nav`
    position: fixed;
    top: 0;
    width: 100%;
    background-color: ${colors.mainRed};
    color: ${colors.lightText};
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.8em;
    z-index: 100;

    @media (max-width: 890px) {
        display: flex;
        justify-content: space-between;

        .Menu {
            display: block;
        }
    }

`;

export const NavLogo = styled.div`
    margin: 0 1.2em;

    img {
        width: 6.5em; 
        height: 6.5em;
    }
`;

export const NavItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.2em;
    height: 6.9em;
    padding: 0 0.5em;

    &:hover {
        background-color: ${props => props.theme.mode === 'dark' ? colors.lightText : colors.mainGray};
        color: ${props => props.theme.mode === 'dark' ? colors.mainRed : colors.lightText};
    }

    h1 {
        font-weight: 600;
    }
`;

export const LoginLink = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${props => props.isProfile ? '0.8em' : '0.2em'};
    background-color: ${colors.mainGray};
    border-radius: 0.7em;
    padding: 0.6em;
    margin: 0 1.2em;
    cursor: pointer;

    &:hover {
        background-color: ${colors.mainGrayLight};
    }

    h1 {
        font-weight: 600;
    }
`;

export const MenuLink = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 1em;
    cursor: pointer;
    display: none;
`;

export const NavGroup = styled.div`
    display: flex;

    .NavItems {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    @media (max-width: 890px) {
        .NavItems {
            display: none;
        }
    }

`;

export const UserProfile = styled.div`
    background-color: ${props => props.color || '#1212ew'};
    width: 3.5em;
    height: 3.5em;
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
    opacity: 1;
    width: 3.8em;
    height: 3.8em;
    border-radius: 100%;
    z-index: 2;
    border: 2px solid ${colors.mainWhite};
`;

