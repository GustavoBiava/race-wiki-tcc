import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';

import axios from '../services/axios';
import { get } from "lodash";
import { AdminContext } from "../contexts/AdminContext";

export const useDriver = () => {
    const { shortName } = useParams();
    const navigate = useNavigate();
    const { mode, unsetAdmin } = useContext(AdminContext);

    const [driver, setDriver] = useState({});
    const [driverResults, setDriverResults] = useState({});

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-br', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

    const goToRacePage = (e) => navigate(`/corrida/${e.currentTarget.id}`); 

    useEffect(() => {
        if (!shortName) return navigate('/');
        if (mode === 'admin') unsetAdmin();
        
        try {
            (async function() {
                const response = await axios.get(`/pages/driver/${shortName}`);
                return setDriver(response.data);
            })();

            (async function() {
                const response = await axios.get(`/pages/driver/${shortName}/2024`);
                return setDriverResults(response.data);
            })();
        }
        catch (err) {
            const errors = get(err, 'response.data.errors', []);
            return errors.map(e => toast.error(e));
        }
    }, []);

    return {
        driver,
        driverResults,
        goToRacePage,
        formatDate,
    }

}