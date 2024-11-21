import React, { useContext, useState } from "react";

import axios from '../services/axios';
import { toast } from "react-toastify";
import { AdminContext } from "../contexts/AdminContext";

export const useDrivers = () => {
    const [drivers, setDrivers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { mode, unsetAdmin } = useContext(AdminContext);

    React.useEffect(() => {
        setIsLoading(true);
        if (mode === 'admin') unsetAdmin();
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