import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import isEmail from "validator/lib/isEmail";
import { useSelector } from "react-redux";

import axios from '../services/axios';
import { AdminContext } from "../contexts/AdminContext";

export const useRegister = () => {
    const navigate = useNavigate();
    const { mode, unsetAdmin } = useContext(AdminContext);

    const isLogged = useSelector(states => states.auth.isLogged);

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [nickname, setNickname] = useState('');
    const [birthDate, setBirthDate] = useState(new Date());
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkbox, setCheckbox] = useState(false);

    const handleButtonClick = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const emailValidation = await emailAlreadyUsed(email);
        if (!emailValidation) return;

        const nicknameValidation = await nicknameAlreadyUsed(nickname);
        if (!nicknameValidation) return;

        return navigate('/equipe-favorita', { state: { name, surname, nickname, birthDate, email, password }});
    }

    const isValidBirthDate = (date) => new Date().getFullYear() - new Date(date).getFullYear() >= 10; 
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

    function validateForm() {
        if (!name) {
            toast.error('Nome inválido!');
            return false;
        }

        if (name.length < 3 || name.length > 30) {
            toast.error('Nome deve possuir entre 3 e 30 caracteres!');
            return false;
        }

        if (!surname) {
            toast.error('Sobrenome inválido!');
            return false;
        }

        if (surname.length < 3 || surname.length > 50) {
            toast.error('Sobrenome deve possuir entre 3 e 50 caracteres!');
            return false;
        }

        if (!nickname) {
            toast.error('Nome de usuário inválido!');
            return false;
        }

        if (surname.length < 3 || surname.length > 30) {
            toast.error('Nome de usuário deve possuir entre 3 e 50 caracteres!');
            return false;
        }

        if (!birthDate) {
            toast.error('Data de nascimento inválida!');
            return true;
        }

        if (!isValidBirthDate(birthDate)) {
            toast.error('Usuário deve ter pelo menos 10 anos!');
            return false;
        }

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
    
        if (!checkbox) {
            toast.error('Você deve ler e concordar com os Termos de Uso e Políticas de Privacidade para se cadastrar!');
            return false;
        }
        return true;
    }

    async function emailAlreadyUsed (email) {
        try {
            const { status } = await axios.get(`/pages/register/validateEmail?email=${email}`);
            if (status === 204) return true;
            toast.error('O E-mail já foi cadastrado!');
            return false;
        }
        catch (err) {
            const errors = err.response.data.errors || ['FATAL ERROR!'];
            errors.map(e => toast.error(e));
            return false;
        }
    }

    async function nicknameAlreadyUsed(nickname) {
        try {
            const { status } = await axios.get(`/pages/register/validateNickname?nickname=${nickname}`);
            if (status === 204) return true;
            toast.error('O nickname já está em uso!');
            return false;
        }
        catch (err) {
            const errors = err.response.data.errors || ['FATAL ERROR!'];
            errors.map(e => toast.error(e));
            return false;
        }
    }

    useEffect(() => {
        if (isLogged) return navigate('/');
        if (mode === 'admin') unsetAdmin();
    }, [isLogged]);

    return {
        handleButtonClick,
        setName,
        setSurname,
        setNickname,
        setBirthDate,
        setEmail,
        setPassword,
        setCheckbox,
        checkbox,
    }
}