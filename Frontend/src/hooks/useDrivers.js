import React, { useState } from "react";

import axios from '../services/axios';
import { toast } from "react-toastify";

export const useDrivers = () => {
    const [drivers, setDrivers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    React.useEffect(() => {
        setIsLoading(true);
        try {
            (async function() {
                const response = await axios.get('/pages/drivers');
                setDrivers(response.data);
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
        drivers,
        setDrivers,
        isLoading,
    }
}