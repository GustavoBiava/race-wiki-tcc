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

            </Route>
        </Routes>
    );
}

export default Router;