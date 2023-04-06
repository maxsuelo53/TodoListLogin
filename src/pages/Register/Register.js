import Alert from '@mui/material/Alert';
import styles from "./Register.module.css"

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from "react-hook-form";

import { useState, useEffect } from "react"
import { useAuthentication } from '../../hooks/useAuthentication';

//ICONS
import { FaUserAlt } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { TbPassword } from "react-icons/tb"
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUserPlus } from "react-icons/fa"

//ALERT ERROR
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tooltip from '@mui/material/Tooltip';


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
    }

    useEffect(() => {
        const notify = () => toast.error(authError)
        if (authError) {
            setError(authError);
            notify();
        }

    }, [authError])

    return (
        <div className='containerComponent' >
            <div className={styles.contentRegister}>
                <div className="iconformStyle">
                    <FaUserPlus />
                </div>
                <div className={styles.title}>
                    <h1>Cadastre-se</h1>
                    <p>Crie seu usuário e organize suas tarefas!</p>
                </div>
                <form onSubmit={handleSubmit(registerUser)} className={styles.formStyle}>
                    <label>
                        <div className={styles.iconInput} >
                            <FaUserAlt />
                        </div>
                        <input type="text"
                            placeholder={`${errors.displayName ? errors.displayName.message : "Nome do usuário"}`}
                            {...register("displayName")}
                            className={`inputStyle ${errors.displayName ? 'errorForm' : ""}`}
                        />

                    </label>
                    <Tooltip title="Não é necessário e-mail ser válido!">
                        <label>
                            <div className={styles.iconInput} >
                                <HiMail />
                            </div>
                            <input type="email"
                                placeholder={`${errors.email ? errors.email.message : "E-mail do usuário"}`}
                                {...register("email")}
                                className={`inputStyle ${errors.email ? 'errorForm' : ""}`}
                            />
                        </label>
                    </Tooltip>
                    <label>
                        <div className={styles.iconInput} >
                            <TbPassword />
                        </div>
                        <input type="password"
                            placeholder={`${errors.password ? errors.password.message : "Digite a sua senha"}`}
                            {...register("password")}
                            className={`inputStyle ${errors.password ? 'errorForm' : ""}`}
                        />
                    </label>
                    <label>
                        <div className={styles.iconInput} >
                            <RiLockPasswordFill />
                        </div>
                        <input type="password"
                            placeholder={`${errors.confirmPassword ? errors.confirmPassword.message : "Confirme a sua senha"}`}
                            {...register("confirmPassword")}
                            className={`inputStyle ${errors.confirmPassword ? 'errorForm' : ""}`}
                        />
                    </label>
                    <button className="btn" type='submit'>Cadastrar</button>
                </form>
                <ToastContainer theme='colored' />
            </div>

        </div>
    )
}

export default Register