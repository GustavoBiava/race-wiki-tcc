import React, { useContext, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { get } from 'lodash';
import { useDispatch } from "react-redux";

import axios from "../services/axios";
import * as actions from '../store/modules/auth/actions';
import { AdminContext } from "../contexts/AdminContext";

export const useFavoriteDrivers = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { mode, unsetAdmin } = useContext(AdminContext);
    
    const { state: userData } = useLocation();
    const [drivers, setDrivers] = useState([]);
    const [selectedDriver, setSelectedDriver] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleDriverClick = (e) => {
        const el = e.currentTarget;
        return selectDriver(el);
    }

    const handleButtonClick = (e) => {
        e.preventDefault();
        if (!selectedDriver) return toast.error('Você deve escolher um piloto para continuar!');

        if (userData.id) {
            (async function() {
                try {
                    await axios.put(`/users`, {
                        favorite_driver: selectedDriver,
                        favorite_team: userData.favoriteTeam,
                    });
                    toast.success('Você alterou seu piloto favorito com sucesso! Por favor, faça login novamente.');
                    return dispatch(actions.loginFailure());
                }
                catch (err) {
                    const errors = get(err, 'response.data.errors', []);
                    return errors.map(e => toast.error(e));
                }
            })();
            return navigate('/entrar');
        }

        dispatch(actions.registerRequest({ ...userData, favoriteDriver: selectedDriver }));
        return navigate('/entrar');
    }

    const selectDriver = (el) => {
        if (el.classList.contains('selected')) {
            el.classList.remove('selected');
            return setSelectedDriver(0);  
        } 

        const selectedClasses = document.querySelectorAll('.selected'); 
        if (selectedClasses.length > 0) {
            toast.error('Você só pode selecionar um piloto favorito!');
            return;
        }
        
        el.classList.add('selected');
        return setSelectedDriver(el.id);
    }

    const returnFavoriteTeam = () => {
        toast.error('Essa equipe não possui pilotos! Por favor, escolha outra equipe.');
        return navigate('/equipe-favorita', { state: { ...userData }});
    }

    React.useEffect(() => {
        if (!userData) return navigate('/');
        if (mode === 'admin') unsetAdmin();
        setIsLoading(true);
        try {
            (async function() {
                const response = await axios.get(`/pages/favoriteDrivers/${userData.favoriteTeam}`);
                setDrivers(response.data);
                return setIsLoading(false);
            })();
        }
        catch (err) {
            const errors = get(err, 'response.data.errors', []);
            errors.map(e => toast.error(e));
            return setIsLoading(false);
        }
    }, [navigate, userData]);

    return {
        drivers,
        selectedDriver,
        handleDriverClick,
        handleButtonClick,
        isLoading,
        returnFavoriteTeam,
    }

}