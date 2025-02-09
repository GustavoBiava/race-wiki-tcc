import { Routes, Route } from 'react-router-dom';

import Footer from '../components/Footer';
import Home from '../pages/Home';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Drivers from '../pages/Drivers';
import Teams from '../pages/Teams';

import FavoriteTeam from '../pages/FavoriteTeam';
import FavoriteDriver from '../pages/FavoriteDriver';

import Publication from '../pages/Publication';
import Driver from '../pages/Driver';
import Team from '../pages/Team';
import Race from '../pages/Race';

import UserProfile from '../pages/Auth/UserProfile';
import Comparation from '../pages/Comparation';

import Circuits from '../pages/Admin/Circuits';
import Circuit from '../pages/Admin/Circuit';

import Contracts from '../pages/Admin/Contracts';
import Contract from '../pages/Admin/Contract';

import Races from '../pages/Admin/Races';
import AdminRace from '../pages/Admin/Race';

import AdminTeams from '../pages/Admin/Teams';
import AdminTeam from '../pages/Admin/Team';

import Countries from '../pages/Admin/Countries';
import Country from '../pages/Admin/Country';

import AdminDrivers from '../pages/Admin/Drivers';
import AdminDriver from '../pages/Admin/Driver';

import Publications from '../pages/Admin/Publications';
import AdminPublication from '../pages/Admin/Publication';

import Tags from '../pages/Admin/Tags';
import Tag from '../pages/Admin/Tag';

import Seasons from '../pages/Admin/Seasons';
import Season from '../pages/Admin/Season';

function Router() {
    
    return (
        <Routes>
            <Route exact path="/" element={<Footer />}>
                <Route exact path='/' element={<Home />}/>
                <Route exact path='entrar' element={<Login/>} />
                <Route exact path='registrar' element={<Register/>} />
                <Route exact path='pilotos' element={<Drivers />} />
                <Route exact path='equipes' element={<Teams />} />

                <Route exact path='equipe-favorita' element={<FavoriteTeam />} />
                <Route exact path='piloto-favorito' element={<FavoriteDriver />} />

                <Route exact path='/noticias/:slug' element={<Publication />} />
                <Route exact path='/piloto/:shortName' element={<Driver />} />
                <Route exact path='/equipe/:shortName' element={<Team />} />
                <Route exact path='/corrida/:slug' element={<Race />} />

                <Route exact path='/meu-perfil' element={<UserProfile/>}/>

                <Route exact path='/comparar' element={<Comparation/>}/>
            </Route>

            <Route exact path='/admin/circuitos' element={<Circuits />} />
            <Route exact path='/admin/circuito/:id?' element={<Circuit />} />

            <Route exact path='/admin/contratos' element={<Contracts />} />
            <Route exact path='/admin/contrato/:id?' element={<Contract />} />

            <Route exact path='/admin/corridas' element={<Races />} />
            <Route exact path='/admin/corrida/:id?' element={<AdminRace />} />

            <Route exact path='/admin/equipes' element={<AdminTeams />} />
            <Route exact path='/admin/equipe/:id?' element={<AdminTeam />} />

            <Route exact path='/admin/paises' element={<Countries />} />
            <Route exact path='/admin/pais/:id?' element={<Country />} />

            <Route exact path='/admin/pilotos' element={<AdminDrivers />} />
            <Route exact path='/admin/piloto/:id?' element={<AdminDriver />} />

            <Route exact path='/admin/publicacoes' element={<Publications />} />
            <Route exact path='/admin/publicacao/:id?' element={<AdminPublication />} />

            <Route exact path='/admin/tags' element={<Tags />} />
            <Route exact path='/admin/tag/:id?' element={<Tag />} />

            <Route exact path='/admin/temporadas' element={<Seasons />} />
            <Route exact path='/admin/temporada/:id?' element={<Season />} />
        </Routes>
    );
}

export default Router;