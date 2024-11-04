import { Outlet } from 'react-router-dom';
import { IoIosMail } from "react-icons/io";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import { Link } from 'react-router-dom'; 

import { FooterContainer, FooterDiv, BrandLogo, SocialMediaContainer, SocialMedia, LinksList, ResponsiveHr } from './styled';

function Footer() {
    
    return (
        <>
            <Outlet />

            <FooterContainer>
                <FooterDiv>
                    <BrandLogo>
                        <img src="/race-wiki-brand-logo.svg" alt="race-wiki-brand-logo" />
                        <h5>A enciclopédia digital da Fórmula 1</h5>
                    </BrandLogo>
                    
                    <SocialMediaContainer>
                        <a href="mailto:biava906@gmail.com" target="_blank">
                            <SocialMedia>
                                <IoIosMail size={24}/>
                            </SocialMedia>
                        </a>

                        <a href="https://www.instagram.com" target="_blank">
                            <SocialMedia>
                                    <RiInstagramFill size={24}/>
                            </SocialMedia>
                        </a>

                        <a href="https://www.facebook.com" target="_blank">
                            <SocialMedia>
                                <FaFacebook size={24}/>
                            </SocialMedia>
                        </a>
                    </SocialMediaContainer>

                    <p>Copyright © 2024 por RaceWiki. Todos direitos reservados.</p>
                </FooterDiv>

                <ResponsiveHr />

                <FooterDiv>
                    <h2>LINKS</h2>

                    <LinksList>
                        <Link to="/">
                            <li>Página Inicial</li>
                        </Link>
                        <Link to="/pilotos">
                            <li>Pilotos</li>
                        </Link>
                        <Link to="/equipes">
                            <li>Equipes</li>
                        </Link>
                        <Link to="/comparar">
                            <li>Comparar</li>
                        </Link>
                        <Link to="/termos-de-uso">
                            <li>Termos de Uso</li>
                        </Link>
                        <Link to="/politicas-de-privacidade">
                            <li>Políticas de Privacidade</li>
                        </Link>
                    </LinksList>
                </FooterDiv>

                <ResponsiveHr />

                <FooterDiv>
                    <h2>SOBRE NÓS</h2>

                    <p>
                        Somos a RaceWiki, a enciclopédia digital sobre Fórmula 1 
                        voltada especialmente para os fãs brasileiros do esporte. Temos como objetivo 
                        trazer para você a maior quantidade de informações sobre a Fórmula 1 na língua portuguesa, 
                        prezando pela qualidade, autenticidade e exclusividade informacional. O que está esperando?
                        Acelere e vem junto com a gente para ganhar essa corrida!
                    </p>

                </FooterDiv>
            </FooterContainer>
        </>
    );

}

export default Footer;