import React, { useState } from "react"
import axios from "../config/axios";

export const useFavoriteTeams = () => {

    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(0);

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
        if (selectedClasses.length > 0) return;
        
        el.classList.add('selected');
        
        return setSelectedTeam(el.id);
    }
 

    React.useEffect(() => {
        (async function() {
            try {
                const response = await axios.get('/pages/favoriteTeams');
                return setTeams(response.data);
            }
            catch (err) {
                const errors = err.errors || [{ message: 'FATAL ERROR!' }];
                return errors.map(e => alert(e.message));
            }
        })();
    }, []);

    return {
        teams,
        selectedTeam,
        handleTeamClick,
    }

}