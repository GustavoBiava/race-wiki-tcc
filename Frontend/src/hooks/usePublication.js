import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "../services/axios";
import { toast } from "react-toastify";

export const usePublication = () => {
    const [publication, setPublication] = useState({});
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!slug) return navigate('/');
        try {
            (async function() {
                const response = await axios.get(`/pages/publication/${slug}`);
                return setPublication(response.data);
            })();
        }
        catch (err) {
            const errors = err.response.data.errors || ['FATAL ERROR!'];
            return errors.map(e => toast.error(e));
        }
    }, [slug]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-br', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    }

    return {
        publication,
        formatDate,
    }

}