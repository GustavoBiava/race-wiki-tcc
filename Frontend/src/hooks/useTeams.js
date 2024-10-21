import React from "react";

import axios from '../services/axios';
import { toast } from "react-toastify";

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
            const errors = err.response.data.errors || ['FATAL ERROR!'];
            return errors.map(e => toast.error(e));
        }
    }, []);

    return {
        teams,
        setTeams,
    }
}