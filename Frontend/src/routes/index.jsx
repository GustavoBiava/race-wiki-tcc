import {Routes, Route } from 'react-router-dom';

import Footer from '../components/Footer';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Drivers from '../pages/Drivers';

function Router() {
    
    return (
        <Routes>
            <Route exact path="/" element={<Footer />}>
                <Route exact path='entrar' element={<Login/>} />
                <Route exact path='registrar' element={<Register/>} />
                <Route exact path='pilotos' element={<Drivers />} />
            </Route>
        </Routes>
    );
}

export default Router;