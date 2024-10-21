import { Link } from "react-router-dom";

import { Container, Button } from "../../../styles/GlobalStyles";
import { Form, FormHeader, FormBody, FormButton, TermsDiv } from "./styled";
import Checkbox from "../../../components/Checkbox";
import { useRegister } from "../../../hooks/useRegister";

function Register() {

    const { 
        handleButtonClick,
        setName,
        setSurname,
        setNickname,
        setBirthDate,
        setEmail,
        setPassword,
        setCheckbox,
        checkbox,
    } = useRegister();

    return (
        <>
            <Container>
                <Form>

                    <FormHeader>
                        <h1>REGISTRAR SUA CONTA</h1>
                        <hr />
                    </FormHeader>

                    <FormBody>
                        <label htmlFor="name">Seu nome:</label>
                        <input type="text" placeholder='Digite aqui seu nome...' onChange={e => setName(e.target.value)}/>

                        <label htmlFor="surname">Seu sobrenome:</label>
                        <input type="text" placeholder='Digite aqui seu sobrenome...' onChange={e => setSurname(e.target.value)}/>

                        <label htmlFor="nickname">Seu nome de usuário:</label>
                        <input type="text" placeholder='Digite aqui seu nome de usuário...' onChange={e => setNickname(e.target.value)}/>

                        <label htmlFor="birth_date">Sua data de nascimento:</label>
                        <input type="date" placeholder='Digite aqui sua data de nascimento...' onChange={e => setBirthDate(e.target.value)}/>

                        <label htmlFor="email">Seu endereço de e-mail:</label>
                        <input type="email" placeholder='Digite aqui seu e-mail...' onChange={e => setEmail(e.target.value)}/>

                        <label htmlFor="password">Sua senha:</label>
                        <input type="password" placeholder='Digite aqui sua senha...' onChange={e => setPassword(e.target.value)}/>

                        <p>
                            Já possui uma conta? <Link to='/entrar'><span>Entre aqui!</span></Link>
                        </p>

                        <TermsDiv>
                            <Checkbox onClick={() => setCheckbox(!checkbox)}/>
                            <p>Eu li e estou de acordo com os <span>Termos de Uso</span> e <span>Políticas de Privacidade</span> da plataforma RaceWiki</p>
                        </TermsDiv>

                    </FormBody>

                    <FormButton>
                        <Button onClick={handleButtonClick}>REGISTRAR-SE</Button>
                    </FormButton>

                </Form>
            </Container>
        </>
    );
}

export default Register;