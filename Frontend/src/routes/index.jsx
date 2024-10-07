import {Routes, Route } from 'react-router-dom';

import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';

function Router() {
    
    return (
        <Routes>
            <Route exact path='/entrar' element={<Login/>} />
            <Route exact path='/registrar' element={<Register/>} />
        </Routes>
    );
}

export default Router;