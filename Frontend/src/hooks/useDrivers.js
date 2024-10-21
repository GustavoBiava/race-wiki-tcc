import React from "react";

import axios from '../services/axios';
import { toast } from "react-toastify";

export const useDrivers = () => {
    const [drivers, setDrivers] = React.useState([]);

    React.useEffect(() => {
        try {
            (async function() {
                const response = await axios.get('/pages/drivers');
                return setDrivers(response.data);
            })();
        }
        catch (err) {
            const errors = err.response.data.errors || ['FATAL ERROR!'];
            return errors.map(e => toast.error(e));
        }
    }, []);

    return {
        drivers,
        setDrivers,
    }
}