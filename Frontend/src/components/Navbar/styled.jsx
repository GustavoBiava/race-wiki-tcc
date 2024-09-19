import styled from 'styled-components';

import * as colors from '../../config/colors';

export const Navbar = styled.nav`
    background-color: ${colors.mainRed};
    color: ${colors.lightText};
    padding: 0.3em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: bold;
    font-size: 1em;
  
    @media (max-width: 768px) {
        display: flex;
        justify-content: center;
    }

`;

export const NavItem = styled.div`
    
`;

export const NavLogo = styled.div`
    margin: 0 1em;
    img {
        width: 6em;
        height: 6em;
    }
`;

export const NavGroup = styled.div`
    display: flex;
    margin: 0 1em;
    gap: 1em;

    @media (max-width: 768px) {
        display: none;
    }

`;