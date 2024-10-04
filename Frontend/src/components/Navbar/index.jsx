import { IoLogIn } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";

import { Navbar, NavItem, NavGroup, NavLogo } from "./styled";
import { useEffect, useState } from "react";

function Nav() {
    const [expand, setExpand] = useState(false);

    useEffect(() => {
        
    }, [expand]);

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
                        <NavItem className="LoginLink">
                            <h1>Entrar/Cadastrar</h1>
                            <IoLogIn size={36}/>
                        </NavItem>
                    </li>
                </ul>

                <NavItem className="Menu" onClick={() => expandNavbar}>
                    <FiMenu size={48}/>
                </NavItem>
                
            </NavGroup>
        </Navbar>
    );
}

export default Nav;