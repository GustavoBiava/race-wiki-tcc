import React, { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { get } from 'lodash';
import { useDispatch } from "react-redux";

import axios from "../services/axios";
import * as actions from '../store/modules/auth/actions';

export const useFavoriteDrivers = () => {
    const dispatch = useDispatch();
    
    const { state: userData } = useLocation();
    const navigate = useNavigate();
    const [drivers, setDrivers] = useState([]);
    const [selectedDriver, setSelectedDriver] = useState(0);

    const handleDriverClick = (e) => {
        const el = e.currentTarget;
        return selectDriver(el);
    }

    const handleButtonClick = (e) => {
        e.preventDefault();
        if (!selectedDriver) return toast.error('Você deve escolher um piloto para continuar!');
        return dispatch(actions.registerRequest({ ...userData, favoriteDriver: selectedDriver }));
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

    React.useEffect(() => {
        if (!userData) return navigate('/');
        try {
            (async function() {
                const response = await axios.get(`/pages/favoriteDrivers/${userData.favoriteTeam}`);
                return setDrivers(response.data);
            })();

        }
        catch (err) {
            const errors = get(err, 'response.data.errors', []);
            return errors.map(e => toast.error(e));
        }
    }, []);

    return {
        drivers,
        selectedDriver,
        handleDriverClick,
        handleButtonClick,
    }

}