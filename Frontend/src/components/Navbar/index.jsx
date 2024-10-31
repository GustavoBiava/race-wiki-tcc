import { IoLogIn } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

import { Navbar, NavItem, NavGroup, NavLogo, LoginLink, MenuLink } from "./styled";
import { useExpanded } from "../../hooks/useExpanded";

function Nav() {
    const {isExpanded, handleMenuClick } = useExpanded();

    return (
        <Navbar>
            <Link to="/">
                <NavLogo>
                        <img src="race-wiki-logo.svg" alt="race-wiki-logo" />
                </NavLogo>
            </Link>
                
            <NavGroup>
                <ul className="NavItems">
                    <li>
                        <Link to="/" >
                            <NavItem>
                                <h1>Página Inicial</h1>
                            </NavItem>
                        </Link>
                    </li>
                    <li>
                        <Link to="pilotos">
                            <NavItem>
                                <h1>Pilotos</h1>
                                {/* <IoIosArrowDown size={20}/> */}
                            </NavItem>
                        </Link>
                    </li>
                    <li>
                        <Link to="equipes">
                            <NavItem>
                                <h1>Equipes</h1>
                                {/* <IoIosArrowDown size={20}/> */}
                            </NavItem>
                        </Link>
                    </li>
                    <li>
                        <Link to="comparar">
                            <NavItem>
                                <h1>Comparar</h1>
                                {/* <IoIosArrowDown size={20}/> */}
                            </NavItem>
                        </Link>
                    </li>
                    <li>
                        <Link to="/entrar">
                            <LoginLink className="Login">
                                <h1>Entrar/Cadastrar</h1>
                                <IoLogIn size={36}/>
                            </LoginLink>
                        </Link>
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