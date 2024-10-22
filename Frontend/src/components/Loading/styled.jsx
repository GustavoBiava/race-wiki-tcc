import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Background = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const LogoDiv = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);

    img {
        width: 10em;
        z-index: 2;
    }
`;