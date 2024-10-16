import React from "react";

import axios from '../config/axios';

export const useTeams = () => {
    const [teams, setTeams] = React.useState([]);

    React.useEffect(() => {
        try {
            (async function() {
                const response = await axios.get('/pages/teams');
                return setTeams(response.data);
            })();
        }
        catch (err) {
            const errors = err.errors || [{ message: 'FATAL ERROR!' }];
            return errors.map(e => alert(e.message));
        }
    }, []);

    return {
        teams,
        setTeams,
    }
}