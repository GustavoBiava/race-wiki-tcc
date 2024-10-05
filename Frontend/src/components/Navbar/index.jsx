import { IoLogIn } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { IoClose } from "react-icons/io5";

import { Navbar, NavItem, NavGroup, NavLogo, LoginLink, MenuLink } from "./styled";
import { useState } from "react";
import { useExpanded } from "../../hooks/useExpanded";

function Nav() {
    const {isExpanded, setIsExpanded, handleMenuClick } = useExpanded();

    return (
        <Navbar>
                <NavLogo>
                    <img src="race-wiki-logo.svg" alt="race-wiki-logo" />
                </NavLogo>

            <NavGroup>
                <ul className="NavItems">
                    <li>
                        <a href="">
                            <NavItem>
                                <h1>Página Inicial</h1>
                            </NavItem>
                        </a>
                    </li>
                    <li>
                        <NavItem>
                            <h1>Pilotos</h1>
                            <IoIosArrowDown size={20}/>
                        </NavItem>
                    </li>
                    <li>
                        <NavItem>
                            <h1>Equipes</h1>
                            <IoIosArrowDown size={20}/>
                        </NavItem>
                    </li>
                    <li>
                        <NavItem>
                            <h1>Corridas</h1>
                            <IoIosArrowDown size={20}/>
                        </NavItem>
                    </li>
                    <li>
                        <LoginLink className="Login">
                            <h1>Entrar/Cadastrar</h1>
                            <IoLogIn size={36}/>
                        </LoginLink>
                    </li>
                </ul>

            </NavGroup>

            <MenuLink className="Menu" onClick={handleMenuClick}>
               {isExpanded 
               ? <IoClose size={48}/>
               : <FiMenu size={48}/> 
               }
            </MenuLink>

        </Navbar>
    );
}

export default Nav;