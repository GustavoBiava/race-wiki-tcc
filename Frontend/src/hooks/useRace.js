import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../services/axios";
import { toast } from "react-toastify";
import { AdminContext } from "../contexts/AdminContext";

export const useRace = () => {
    const navigate = useNavigate();
    const { slug } = useParams();
    const [race, setRace] = useState({});
    const { mode, unsetAdmin } = useContext(AdminContext);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-br', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

    const goToDriverPage = (e) => navigate(`/piloto/${e.currentTarget.id}`); 

    useEffect(() => {
        if (mode === 'admin') unsetAdmin();
        if (!slug) return navigate('/');
        try {
            (async function() {
                const response = await axios.get(`/pages/race/${slug}`);
                setRace(response.data);
            })();
        }
        catch (err) {
            const errors = err.response.data.errors || ['FATAL ERROR!'];
            return errors.map(e => toast.error(e));
        }
    }, []);

    return {
        race,
        formatDate,
        goToDriverPage,
    }
}