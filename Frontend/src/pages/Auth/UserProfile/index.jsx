import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { isEmail } from 'validator';

import { Button, Container } from '../../../styles/GlobalStyles';
import axios from '../../../services/axios';
import * as actions from '../../../store/modules/auth/actions';
import { 
    Content,
    Form,
    FormBody,
    FormButton,
    FormHeader,
    ProfileContainer,
    ProfileCircle,
    BackgroundImg,
    DriverPicture,
    UserContainer,
    ButtonsContainer,
    ProfileDiv,
    UserInfo
} from './styled';

function UserProfile() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLogged, user } = useSelector(states => states.auth);
    const { favorite_driver } = user;

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

    const handleButtonClick = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const emailValidation = await emailAlreadyUsed(email);
        if (!emailValidation) return;

        const nicknameValidation = await nicknameAlreadyUsed(nickname);
        if (!nicknameValidation) return;

        return await axios.put('/users', {
            name,
            surname,
            nickname,
            birthDate,
            email,
            password,
        });
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
            return errors.map(e => toast.error(e));
        }

    }, []);

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

    return (
        <Container>
            <Content>
                <UserContainer>
                    <ProfileDiv>
                        <ProfileCircle color={userProfile.color}>
                            { userProfile.driver_picture
                                ? <DriverPicture src={userProfile.driver_picture.url} alt="driver-picture"/>
                                : <DriverPicture src='driver-default-picture.jpg' alt="driver-picture"/>
                            }
                            <BackgroundImg src="/driver-background.jpg" alt="driver-background" />
                        </ProfileCircle>

                        <UserInfo>
                            <h1>{user.name} {user.surname}</h1>
                            <h2>{user.nickname}</h2>
                        </UserInfo>

                    </ProfileDiv>

                    <ButtonsContainer>
                        <Button onClick={handleFavoriteDriverButton}>TROCAR PILOTO</Button>
                        { user.type === 'ADMIN' ? <Button>ADMIN</Button> : ''}
                        <Button onClick={handleLogoutClick}>SAIR</Button>
                    </ButtonsContainer>

                </UserContainer>
                    
                <ProfileContainer>
                    <Form>
                        <FormHeader>
                            <h1>EDITAR SUA CONTA</h1>
                            <hr />
                        </FormHeader>

                        <FormBody>
                            <label htmlFor="name">Seu nome:</label>
                            <input type="text" placeholder='Digite aqui seu nome...' value={name} onChange={e => setName(e.target.value)}/>

                            <label htmlFor="surname">Seu sobrenome:</label>
                            <input type="text" placeholder='Digite aqui seu sobrenome...' value={surname} onChange={e => setSurname(e.target.value)}/>

                            <label htmlFor="nickname">Seu nome de usuário:</label>
                            <input type="text" placeholder='Digite aqui seu nome de usuário...' value={nickname} onChange={e => setNickname(e.target.value)}/>

                            <label htmlFor="birth_date">Sua data de nascimento:</label>
                            <input type="date" placeholder='Digite aqui sua data de nascimento...' value={birthDate} onChange={e => setBirthDate(e.target.value)}/>

                            <label htmlFor="email">Seu endereço de e-mail:</label>
                            <input type="email" placeholder='Digite aqui seu e-mail...' value={email} onChange={e => setEmail(e.target.value)}/>

                            <label htmlFor="password">Sua senha:</label>
                            <input type="password" placeholder='Digite aqui sua nova senha...' onChange={e => setPassword(e.target.value)}/>
                        </FormBody>

                        <FormButton>
                            <Button onClick={handleButtonClick} >SALVAR</Button>
                        </FormButton>
                    </Form>
                </ProfileContainer>
            </Content>
        </Container>
    );

}

export default UserProfile;