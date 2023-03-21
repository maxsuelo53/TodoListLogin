import Alert from '@mui/material/Alert';
import styles from "./Login.module.css"

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from "react-hook-form";



import { useState, useEffect } from "react"
import { useAuthentication } from '../../hooks/useAuthentication';


const schema = yup.object({
    email: yup.string().email("Digite um e-mail válido").required("E-mail é obrigatório"),
    password: yup.string().required("A senha é obrigatório"),
}).required();



const Login = () => {
    const [error, setError] = useState("");
    const { loginUser, error: authError, loading } = useAuthentication();

    const { register: login, handleSubmit, watch, formState: { errors } }
        = useForm({
            resolver: yupResolver(schema)
        });

    const loginUserSubmit = async (userData) => {
        const res = await loginUser(userData);
        console.log(res)
    }

    useEffect(() => {
        if (authError) {
            setError(authError)
        }
    }, [authError])

    return (
        <div className={styles.register} >
            <div className={styles.contentRegister}>
                <div className={styles.title}>
                    <h1>Login</h1>
                    <p>Acesse o sistema para gerenciar suas tarefas!</p>
                </div>
                <form onSubmit={handleSubmit(loginUserSubmit)} className={styles.formStyle}>
                    <label>
                        <span>E-mail</span>
                        <input type="email"
                            placeholder={`${errors.email ? errors.email.message : "E-mail do usuário"}`}
                            {...login("email")}
                            className={`${errors.email ? 'errorForm' : ""}`}
                        />
                    </label>
                    <label>
                        <span>Senha</span>
                        <input type="password"
                            placeholder={`${errors.password ? errors.password.message : "Digite a sua senha"}`}
                            {...login("password")}
                            className={`${errors.password ? 'errorForm' : ""}`}
                        />
                    </label>
                    <button className="btn" type='submit'>Entrar</button>
                    {authError && (
                        <Alert variant="standard" severity="error" className='alertError'>
                            {authError}
                        </Alert>
                    )}
                </form>
            </div>

        </div>
    )
}

export default Login