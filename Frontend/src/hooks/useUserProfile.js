import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { ThemeContext } from "../contexts/ThemeContext";
import * as actions from '../store/modules/auth/actions';
import axios from "../services/axios";
import { ToastContainer, toast } from "react-toastify";
import { get } from "lodash";
import { isEmail } from "validator";

export const useUserProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLogged, user } = useSelector(states => states.auth);
    const { favorite_driver } = user;
    const { handleThemeChange } = useContext(ThemeContext);

    const [userProfile, setUserProfile] = useState({});

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [nickname, setNickname] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogoutClick = () => {
        dispatch(actions.loginFailure());
        toast.success('Você saiu com sucesso!');
        return navigate('/entrar');
    }

    const emailValidate = async (email) => {
        if (email === user.email) return true;
        const emailValidation = await emailAlreadyUsed(email);
        return emailValidation;
    }

    const nicknameValidate = async (nickname) => {
        if (nickname === user.nickname) return true;
        const nicknameValidation = await nicknameAlreadyUsed(nickname);
        return nicknameValidation; 
    }

    const passwordValidate = (user) => {
        if (!password) return true;

        if (!passwordRegex.test(password)) {
            toast.error('Senha deve conter: Letras maiúsculas e minúsculas, caracteres especiais e números!');
            return false;
        }

        user.password = password;
        return true;
    }

    const handleButtonClick = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;
        if (!emailValidate(email)) return toast.error('O E-mail já foi cadastrado!');
        if (!nicknameValidate(nickname)) return toast.error('O nickname já está em uso!');

        const updatedUser = {
            name,
            surname,
            nickname,
            birth_date: birthDate,
            email,
        }

        if (!passwordValidate(updatedUser)) return;
        
        try {
            await axios.put('/users', updatedUser);
            dispatch(actions.loginFailure());
            toast.success('Dados alterados com sucesso! Por favor, faça login novamente.');
            return navigate('/entrar');
        }
        catch { return false;}
    }

    const handleFavoriteDriverButton = () => navigate('/equipe-favorita', { state: user });

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
        return true;
    }

    useEffect(() => {
        if (!isLogged) return navigate('/entrar');
        if (!user) return navigate('/entrar');

        setName(user.name);
        setSurname(user.surname);
        setNickname(user.nickname);
        setBirthDate(user.birth_date.split('T')[0]);
        setEmail(user.email);

        try {
            (async function() {
                const response = await axios.get(`/pages/profile/${favorite_driver}`);
                return setUserProfile(response.data);
            })();

        }
        catch (err) {
            const errors = get(err, 'response.data.errors', []);
            return errors.map(e => ToastContainer.error(e));
        }

    }, [favorite_driver, isLogged, navigate, user]);

    async function emailAlreadyUsed(email) {
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

    return {
        userProfile,
        user,
        handleFavoriteDriverButton,
        handleThemeChange,
        handleLogoutClick,
        handleButtonClick,
        name,
        setName,
        surname,
        setSurname,
        email,
        setEmail,
        nickname,
        setNickname,
        setBirthDate,
        birthDate,
        password,
        setPassword,
    }
}