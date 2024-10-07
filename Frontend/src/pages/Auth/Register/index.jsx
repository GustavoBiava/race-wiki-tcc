import { Link } from "react-router-dom";

import { Container, Button } from "../../../styles/GlobalStyles";
import { Form, FormHeader, FormBody, FormButton, TermsDiv } from "./styled";
import Checkbox from "../../../components/Checkbox";

function Register() {

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
                        <input type="text" placeholder='Digite aqui seu nome...'/>

                        <label htmlFor="surname">Seu sobrenome:</label>
                        <input type="text" placeholder='Digite aqui seu sobrenome...'/>

                        <label htmlFor="nickname">Seu nome de usuário:</label>
                        <input type="text" placeholder='Digite aqui seu nome de usuário...'/>

                        <label htmlFor="birt_date">Seu nome de usuário:</label>
                        <input type="date" placeholder='Digite aqui sua data de nascimento...'/>

                        <label htmlFor="email">Seu endereço de e-mail:</label>
                        <input type="email" placeholder='Digite aqui seu e-mail...'/>

                        <label htmlFor="password">Sua senha:</label>
                        <input type="password" placeholder='Digite aqui sua senha...'/>

                        <p>
                            Já possui uma conta? <Link to='/entrar'><span>Entre aqui!</span></Link>
                        </p>

                        <TermsDiv>
                            <Checkbox/>
                            <p>Eu li e estou de acordo com os <span>Termos de Uso</span> e <span>Políticas de Privacidade</span> da plataforma RaceWiki</p>
                        </TermsDiv>

                    </FormBody>

                    <FormButton>
                        <Button>REGISTRAR-SE</Button>
                    </FormButton>

                </Form>
            </Container>
        </>
    );
}

export default Register;