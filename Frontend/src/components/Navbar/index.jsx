import { Navbar, NavItem, NavGroup, NavLogo } from "./styled";

function Nav() {
    return (
        <Navbar>
                <NavLogo>
                    <img src="race-wiki-logo.svg" alt="race-wiki-logo" />
                </NavLogo>

            <NavGroup>
                <NavItem>Página Inicial</NavItem>
                <NavItem>Pilotos</NavItem>
                <NavItem>Equipes</NavItem>
            </NavGroup>
        </Navbar>
    );
}

export default Nav;