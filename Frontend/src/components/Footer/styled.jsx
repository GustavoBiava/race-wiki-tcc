import styled from 'styled-components';
import * as colors from '../../config/colors'; 

export const FooterContainer = styled.div`
    background-color: ${props => props.theme.mode === 'dark' ? colors.secondRed : colors.darkBackground};
    width: 100%;
    height: 10em;
`;

export const FooterDiv = styled.div`

`;