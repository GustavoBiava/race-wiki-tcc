import styled from 'styled-components';
import * as colors from '../../config/colors';

export const CheckboxContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

export const StyledCheckbox = styled.label`
    all: unset;
    display: grid;
    place-items: center;
    width: 1.3em;
    height: 1.3em;
    background-color: ${props => props.theme.mode === 'dark' ? colors.darkBackground : colors.lightText};
    background-color: ${props => props.checked ? colors.mainRed : ''};
    border: 1px solid ${props => props.theme.mode === 'dark' ? colors.lightText : colors.darkBackground};
    border-radius: 0.2em;

    svg {
        display: ${props => props.checked ? 'block' : 'none'};
        color: ${colors.lightText};
    }
`;