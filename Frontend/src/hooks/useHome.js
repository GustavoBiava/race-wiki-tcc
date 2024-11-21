import { useContext, useEffect, useState } from "react";
import axios from "../services/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../contexts/AdminContext";

export const useHome = () => {
    const navigate = useNavigate();
    const { mode, unsetAdmin } = useContext(AdminContext);

    const [races, setRaces] = useState([]);
    const [publications, setPublications] = useState([]);
    const [driverClassificationLeaders, setDriverClassificationLeaders] = useState([]);
    const [driverClassification, setDriverClassification] = useState([]);
    const [teamClassificationLeaders, setTeamClassificationLeaders] = useState([]);
    const [teamClassification, setTeamClassification] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (mode === 'admin') unsetAdmin();
        try {
            setIsLoading(true);
            (async function() {
                const response = await axios.get('/pages/home/races/2024');
                setRaces(response.data);
            })();

            (async function() {
                const response = await axios.get('/pages/home/publications');
                setPublications(response.data);
            })();

            (async function() {
                const response = await axios.get('/pages/home/driverClassificationLeaders/2024');
                setDriverClassificationLeaders(response.data);
            })();

            (async function() {
                const response = await axios.get('/pages/home/driverClassification/2024');
                setDriverClassification(response.data);
            })();

            (async function() {
                const response = await axios.get('/pages/home/teamClassificationLeaders/2024');
                setTeamClassificationLeaders(response.data);
            })();

            (async function() {
                const response = await axios.get('/pages/home/teamClassification/2024');
                setTeamClassification(response.data);
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

        if (minuteDiff > 0) return `${minuteDiff} minuto(s)`;
        if (hourDiff > 0) return `${hourDiff} hora(s)`;
        if (dayDiff > 0) return `${dayDiff} dia(s)`;
        if (monthDiff > 0) return `${monthDiff} mês(es)`;
        if (yearDiff > 0) return `${yearDiff} ano(s)`;

        return 'menos de 1 minuto';
    }

    const goToDriverPage = (e) => navigate(`/piloto/${e.currentTarget.id}`); 
    const goToTeamPage = (e) => navigate(`/equipe/${e.currentTarget.id}`); 

    return {
        races,
        publications,
        driverClassificationLeaders,
        driverClassification,
        isLoading,
        formatDate,
        getPublicationHour,
        goToDriverPage,
        goToTeamPage,
        teamClassificationLeaders,
        teamClassification
    }
}