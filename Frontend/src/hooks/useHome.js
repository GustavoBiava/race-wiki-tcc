import { useEffect, useState } from "react";
import axios from "../services/axios";
import { toast } from "react-toastify";

export const useHome = () => {
    const [races, setRaces] = useState([]);
    const [publications, setPublications] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        try {
            (async function() {
                const response = await axios.get('/pages/home/races');
                setRaces(response.data);
            })();

            (async function() {
                const response = await axios.get('/pages/home/publications');
                setPublications(response.data);
            })();

            return setIsLoading(false);
        }
        catch (err) {
            const errors = err.response.data.errors || ['FATAL ERROR!'];
            errors.map(e => toast.error(e));
            return setIsLoading(false);
        }
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-br', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        }).toUpperCase();
    }

    const getPublicationHour = (dateString) => {
        const date = new Date(dateString);
        date.setHours(date.getHours() + 3);
        const actualDate = new Date();

        const yearDiff = actualDate.getFullYear() - date.getFullYear();
        const monthDiff = (actualDate.getMonth() - date.getMonth());
        const dayDiff = actualDate.getDate() - date.getDate();
        const hourDiff = actualDate.getHours() - date.getHours();
        const minuteDiff = actualDate.getMinutes() - date.getMinutes();

        if (yearDiff > 0) return `${yearDiff} ano(s)`;
        if (monthDiff > 0) return `${monthDiff} mês(es)`;
        if (dayDiff > 0) return `${dayDiff} dia(s)`;
        if (hourDiff > 0) return `${hourDiff} hora(s)`;
        if (minuteDiff > 0) return `${minuteDiff} minuto(s)`;

        return 'menos de 1 minuto';
    }

    return {
        races,
        publications,
        isLoading,
        formatDate,
        getPublicationHour,
    }
}