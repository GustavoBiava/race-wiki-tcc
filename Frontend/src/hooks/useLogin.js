import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';

import * as actions from '../store/modules/auth/actions';

export const useLogin = () => {
    const dispatch = useDispatch();

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

    return {
        setEmail,
        setPassword,
        handleButtonClick
    }

}