import React, { useState } from "react"
import axios from "../config/axios";
import { useLocation, useNavigate } from "react-router-dom";

export const useFavoriteDrivers = () => {

    const navigate = useNavigate();
    const { state } = useLocation();
    const [drivers, setDrivers] = useState([]);
    const [selectedDriver, setSelectedDriver] = useState(0);

    const handleDriverClick = (e) => {
        const el = e.currentTarget;
        return selectDriver(el);
    }

    const selectDriver = (el) => {
        if (el.classList.contains('selected')) {
            el.classList.remove('selected');
            return setSelectedDriver(0);  
        } 

        const selectedClasses = document.querySelectorAll('.selected'); 
        if (selectedClasses.length > 0) return;
        
        el.classList.add('selected');
        return setSelectedDriver(el.id);
    }

    React.useEffect(() => {
        if (!state) return navigate('/');
        try {
            (async function() {
                const response = await axios.get(`/pages/favoriteDrivers/${state}`);
                return setDrivers(response.data);
            })();
        }
        catch (err) {
            const errors = err.errors || [{ message: 'FATAL ERROR!' }];
            return errors.map(e => alert(e.message));
        }
    }, []);

    return {
        drivers,
        selectedDriver,
        handleDriverClick,
    }

}