import {Routes, Route } from 'react-router-dom';

import Footer from '../components/Footer';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';

function Router() {
    
    return (
        <Routes>
            <Route exact path="/" element={<Footer />}>
                <Route exact path='entrar' element={<Login/>} />
                <Route exact path='registrar' element={<Register/>} />
            </Route>
        </Routes>
    );
}

export default Router;