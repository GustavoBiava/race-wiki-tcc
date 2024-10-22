import { useEffect, useState } from "react";

import axios from '../services/axios';
import { toast } from "react-toastify";

export const useTeams = () => {
    const [teams, setTeams] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        try {
            (async function() {
                const response = await axios.get('/pages/teams');
                setTeams(response.data);
                return setIsLoading(false);
            })();
        }
        catch (err) {
            const errors = err.response.data.errors || ['FATAL ERROR!'];
            errors.map(e => toast.error(e));
            return setIsLoading(false);
        }
    }, []);

    return {
        teams,
        setTeams,
        isLoading,
    }
}