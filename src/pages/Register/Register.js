import Alert from '@mui/material/Alert';
import { useState, useEffect } from "react"
import styles from "./Register.module.css"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useAuthentication } from '../../hooks/useAuthentication';


const schema = yup.object({
    displayName: yup.string().required("Nome é obrigatório"),
    email: yup.string().email("Digite um e-mail válido").required("E-mail é obrigatório"),
    password: yup.string().min(6, "A senha deve ter pelo menos 6 caracteres").required("A senha é obrigatório"),
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
    return (
        <div className={styles.register} >
            <div className={styles.contentRegister}>
                <div className={styles.title}>
                    <h1>Cadastre-se</h1>
                    <p>Crie seu usuário e organize suas tarefas!</p>
                </div>
                <form onSubmit={handleSubmit(registerUser)}>
                    <label>
                        <span>Nome:</span>
                        <input type="text"
                            placeholder="Nome do usuário"
                            {...register("displayName")}
                        />
                        {errors.displayName && <Alert severity="error">{errors.displayName.message}</Alert>}
                    </label>
                    <label>
                        <span>E-mail:</span>
                        <input type="email"
                            placeholder="E-mail do usuário"
                            {...register("email")}
                        />
                        {errors.email && <Alert severity="error">"{"nome "}</Alert>}
                    </label>
                    <label>
                        <span>Senha:</span>
                        <input type="password"
                            placeholder="Digite a sua senha"
                            {...register("password")}
                        />
                    </label>
                    <label>
                        <span>Senha:</span>
                        <input type="password"
                            placeholder="Confirme a suua senha"
                            {...register("confirmPassword")}
                        />
                    </label>
                    <button className="btn" type='submit'>Cadastrar</button>
                </form>
            </div>
        </div>
    )
}

export default Register