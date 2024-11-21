import { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useNavigate } from 'react-router-dom';

import { AdminContext } from '../contexts/AdminContext';
import * as actions from '../store/modules/auth/actions';

export const useLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { mode, unsetAdmin } = useContext(AdminContext);

    const isLoading = useSelector(states => states.auth.isLoading);
    const isLogged = useSelector(states => states.auth.isLogged);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleButtonClick = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        return dispatch(actions.loginRequest({ email, password }));
    }

    const validateForm = () => {
        if (!email || !isEmail(email)) {
            toast.error('E-mail inválido!');
            return false;
        }

        if (!password) {
            toast.error('Senha inválida!');
            return false;
        }

        return true;
    }

    useEffect(() => {
        if (isLogged) return navigate('/');
        if (mode === 'admin') unsetAdmin();
    }, [isLogged]);

    return {
        setEmail,
        setPassword,
        handleButtonClick,
        isLoading
    }

}