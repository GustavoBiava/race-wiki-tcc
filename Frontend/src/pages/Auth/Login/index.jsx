import { Link } from 'react-router-dom';

import { Form, FormHeader, FormBody, FormButton, RegisterDiv } from "./styled";
import { Container, Button } from "../../../styles/GlobalStyles";

function Login() {

    return (
        <>
            <Container>
                <Form>

                    <FormHeader>
                        <h1>ENTRAR EM SUA CONTA</h1>
                        <hr />
                    </FormHeader>

                    <FormBody>
                        <label htmlFor="email">Seu endereço de e-mail:</label>
                        <input type="email" placeholder='Digite aqui seu e-mail...'/>

                        <label htmlFor="password">Sua senha:</label>
                        <input type="password" placeholder='Digite aqui sua senha...'/>

                        <p>Esqueceu sua senha?</p>
                    </FormBody>

                    <FormButton>
                        <Button>ENTRAR</Button>
                    </FormButton>

                    <RegisterDiv>
                        <p>
                            Ainda não tem uma conta? <Link to='/registrar'><span>Registre-se agora!</span></Link>
                        </p>
                    </RegisterDiv>

                </Form>
            </Container>
        </>
    );

}

export default Login;