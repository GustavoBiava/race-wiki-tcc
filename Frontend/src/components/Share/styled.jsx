import styled from "styled-components";

import * as colors from '../../config/colors';

export const ShareContainer = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6em;
    background-color: ${props => props.theme.mode === 'dark' ? colors.mainGrayLight : colors.mainWhiteDark};
    padding: 0.4em;
    border-radius: 0.6em;
    border: 2px solid ${props => props.theme.mode === 'dark' ? 'rgba(11, 11, 14, 0.6)' : 'rgba(120, 120, 135, 0.3)'};
    font-size: 0.8em;
    width: fit-content;
    height: 4em;

    svg {
        color: rgba(120, 120, 135, 0.3);
    }

    &:hover {
        svg {
            color: rgba(120, 120, 135, 0.5);
        }     
    }

    @media (max-width: 770px) {
        width: 100%;
    }

`;