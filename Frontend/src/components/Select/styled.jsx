import styled from "styled-components";
import * as colors from '../../config/colors';

export const Dropdown = styled.div`
    width: 100%;
    position: relative;
    user-select: none;
`;

export const DropdownBtn = styled.div`
    height: 3.2em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    background-color: ${props => props.theme.mode === 'dark' ? colors.mainGray : colors.lightText};
    border: 2px solid ${props => props.theme.mode === 'dark' ? 'rgba(11, 11, 14, 0.6)' : 'rgba(120, 120, 135, 0.2)'};
    border-radius: 0.4em;
    padding: 0.2em 0.7em;
    font-weight: 400;

    &:hover {
        background-color: ${props => props.theme.mode === 'dark' ? colors.mainGrayLight : colors.mainWhiteDark};
    }

`;

export const DropdownContent = styled.div`
    display: flex;
    gap: 0.2em;
    flex-direction: column;
    position: absolute;
    background-color: ${props => props.theme.mode === 'dark' ? colors.mainGray : colors.mainWhite};
    border-radius: 0.4em;
    width: 100%;
    left: 0;
    top: 115%;
    padding: 0.5em;
    font-weight: 400;
    z-index: 50;
`;

export const DropdownItem = styled.div`
    background-color: ${props => props.theme.mode === 'dark' ? colors.mainGray : colors.mainWhite};
    border-radius: 0.4em;
    padding: 0.5em;
    cursor: pointer;

    &:hover {
        background-color: ${props => props.theme.mode === 'dark' ? colors.mainGrayLight : colors.mainWhiteDark};
    }
`;