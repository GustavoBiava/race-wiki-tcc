import React from "react";

import axios from '../config/axios';

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
            const errors = err.errors || [{ message: 'FATAL ERROR!' }];
            return errors.map(e => alert(e.message));
        }
    }, []);

    return {
        drivers,
        setDrivers,
    }
}