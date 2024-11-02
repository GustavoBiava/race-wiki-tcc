import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";

import axios from '../services/axios';

export const useExpanded = () => {

    const isLogged = useSelector(state => state.auth.isLogged);
    const favoriteDriver = useSelector(state => state.auth.user.favorite_driver);
    const userNickname = useSelector(state => state.auth.user.nickname);

    const [isExpanded, setIsExpanded] = React.useState(false);
    const [userProfile, setUserProfile] = useState({});

    const handleMenuClick = (e) => {
        const navbar = e.currentTarget.parentNode;

        if (!isExpanded) {
            navbar.classList.add('navbar-responsive')
            return setIsExpanded(true);
        }
        
        navbar.classList.remove('navbar-responsive');
        return setIsExpanded(false);
    }

    useEffect(() => {
        if (!isLogged) return;
        if (!favoriteDriver) return;

        (async function() {
            try {
                const response = await axios.get(`/pages/navbar/${favoriteDriver}`);
                return setUserProfile(response.data);
            }
            catch (err) {
                const errors = err.response.data.errors || ['FATAL ERROR!'];
                errors.map(e => toast.error(e));
            }
        })();

    }, [isLogged, favoriteDriver]);

    return {
        isExpanded,
        setIsExpanded,
        handleMenuClick,
        userProfile,
        isLogged,
        userNickname,
    }
}