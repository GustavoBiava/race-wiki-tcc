import React, { useState } from "react"
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "../services/axios";

export const useFavoriteTeams = () => {

    const navigate = useNavigate();
    const { state: userData } = useLocation();
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleTeamClick = (e) => {
        const el = e.currentTarget;
        return selectTeam(el);
    }

    const selectTeam = (el) => {
        if (el.classList.contains('selected')) {
            el.classList.remove('selected');
            return setSelectedTeam(0);  
        } 

        const selectedClasses = document.querySelectorAll('.selected'); 
        if (selectedClasses.length > 0) {
            toast.error('Você só pode selecionar uma equipe favorita!');
            return;
        }

        el.classList.add('selected');
        return setSelectedTeam(el.id);
    }

    const handleButtonClick = (e) => {
        e.preventDefault();
        if (!selectedTeam) return toast.error('Você deve escolher uma equipe para continuar!');
        return navigate('/piloto-favorito', { state: { ...userData, favoriteTeam: selectedTeam } });
    }
 
    React.useEffect(() => {
        if (!userData) return navigate('/');
        setIsLoading(true);
        (async function() {
            try {
                const response = await axios.get('/pages/favoriteTeams');
                setTeams(response.data);
                return setIsLoading(false);
            }
            catch (err) {
                const errors = err.response.data.errors || ['FATAL ERROR!'];
                errors.map(e => toast.error(e));
                return setIsLoading(false);
            }
        })();
    }, []);

    return {
        teams,
        selectedTeam,
        handleTeamClick,
        userData,
        handleButtonClick,
        isLoading,
    }

}