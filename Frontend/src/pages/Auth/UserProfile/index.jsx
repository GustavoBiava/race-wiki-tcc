import { Link } from 'react-router-dom';
import { useUserProfile } from '../../../hooks/useUserProfile';
import { Button, Container } from '../../../styles/GlobalStyles';

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

    const { 
        handleFavoriteDriverButton,
        user,
        userProfile,
        handleThemeChange,
        handleLogoutClick,
        email,
        handleButtonClick,
        name,
        setEmail,
        setName,
        setSurname,
        surname,
        birthDate,
        nickname,
        setBirthDate,
        setNickname,
        setPassword,
        handleAdminClick
    } = useUserProfile();

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
                        <Button onClick={handleThemeChange}>TROCAR TEMA</Button>
                        { user.type === 'ADMIN' 
                            ? (
                                <Button onClick={handleAdminClick}>ADMINISTRADOR</Button>
                            ): ''}
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