import { Outlet } from 'react-router-dom';
import { FooterContainer } from './styled';

function Footer() {
    
    return (
        <>
            <Outlet />
            <FooterContainer>
            </FooterContainer>
        </>
    );

}

export default Footer;