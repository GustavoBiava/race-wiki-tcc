import { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';

export const useLogin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleButtonClick = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
       return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

    const validateForm = () => {
        if (!email || !isEmail(email)) {
            toast.error('E-mail inválido!');
            return false;
        }

        if (!password) {
            toast.error('Senha inválida!');
            return false;
        }

        if (!passwordRegex.test(password)) {
            toast.error('Senha deve conter: Letras maiúsculas e minúsculas, caracteres especiais e números!');
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