import Alert from '@mui/material/Alert';
import styles from "./Register.module.css"

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from "react-hook-form";

import { useState, useEffect } from "react"
import { useAuthentication } from '../../hooks/useAuthentication';


const schema = yup.object({
    displayName: yup.string().required("Nome é obrigatório"),
    email: yup.string().email("Digite um e-mail válido").required("E-mail é obrigatório"),
    password: yup.string().required("A senha é obrigatório"),
    confirmPassword: yup.string().required("Confirmar a senha é obrigatório").oneOf([yup.ref("password")], "As senhas devem ser iguais"),
}).required();


const Register = () => {

    const [error, setError] = useState("");
    const { createUser, error: authError, loading } = useAuthentication();

    const { register, handleSubmit, watch, formState: { errors } }
        = useForm({
            resolver: yupResolver(schema)
        });

    const registerUser = async (userData) => {
        const res = await createUser(userData);
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
                    <h1>Cadastre-se</h1>
                    <p>Crie seu usuário e organize suas tarefas!</p>
                </div>
                <form onSubmit={handleSubmit(registerUser)} className={styles.formStyle}>
                    <label>
                        <span>Nome</span>
                        <input type="text"
                            placeholder={`${errors.displayName ? errors.displayName.message : "Nome do usuário"}`}
                            {...register("displayName")}
                            className={`${errors.displayName ? 'errorForm' : ""}`}
                        />

                    </label>
                    <label>
                        <span>E-mail</span>
                        <input type="email"
                            placeholder={`${errors.email ? errors.email.message : "E-mail do usuário"}`}
                            {...register("email")}
                            className={`${errors.email ? 'errorForm' : ""}`}
                        />
                    </label>
                    <label>
                        <span>Senha</span>
                        <input type="password"
                            placeholder={`${errors.password ? errors.password.message : "Digite a sua senha"}`}
                            {...register("password")}
                            className={`${errors.password ? 'errorForm' : ""}`}
                        />
                    </label>
                    <label>
                        <span>Confirmação de senha</span>
                        <input type="password"
                            placeholder={`${errors.confirmPassword ? errors.confirmPassword.message : "Confirme a sua senha"}`}
                            {...register("confirmPassword")}
                            className={`${errors.confirmPassword ? 'errorForm' : ""}`}
                        />
                    </label>
                    <button className="btn" type='submit'>Cadastrar</button>
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

export default Register