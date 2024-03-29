import Alert from '@mui/material/Alert';
import styles from "./Login.module.css"
import { Link } from 'react-router-dom';

//ICONS
import { BsPersonFill } from "react-icons/bs";
import { HiMail } from "react-icons/hi";
import { TbPassword } from "react-icons/tb";


import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from "react-hook-form";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tooltip from '@mui/material/Tooltip';



import { useState, useEffect } from "react"
import { useAuthentication } from '../../hooks/useAuthentication';


const schema = yup.object({
    email: yup.string().email("Digite um e-mail válido").required("E-mail é obrigatório"),
    password: yup.string().required("A senha é obrigatório"),
}).required();



const Login = () => {
    const [error, setError] = useState("");
    const [statusLogin, setStatusLogin] = useState('');
    const { loginUser, error: authError, loading } = useAuthentication();

    const { register: login, handleSubmit, watch, formState: { errors } }
        = useForm({
            resolver: yupResolver(schema)
        });

    const loginUserSubmit = async (userData) => {
        let res = await loginUser(userData);
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
            <div className={styles.containerLogin}>
                <div className={"iconformStyle"}>
                    <BsPersonFill />
                </div>
                <div className={styles.title}>
                    <h1>Login</h1>
                    <p>Acesse o sistema para gerenciar suas tarefas!</p>
                </div>
                <form onSubmit={handleSubmit(loginUserSubmit)} className="contentForm">
                    <label className='labelContent'>
                        <div div className="iconInput" >
                            <HiMail />
                        </div>
                        <input type="email"
                            placeholder={`${errors.email ? errors.email.message : "E-mail do usuário"}`}
                            {...login("email")}
                            className={` inputStyle ${errors.email ? 'errorForm' : ""}`}
                        />
                    </label >
                    <label className='labelContent'>
                        <div className="iconInput">
                            <TbPassword />
                        </div>
                        <input type="password"
                            placeholder={`${errors.password ? errors.password.message : "Digite a sua senha"}`}
                            {...login("password")}
                            className={` inputStyle ${errors.password ? 'errorForm' : ""}`}
                        />
                    </label>
                    <button className={`btn ${styles.buttonSend}`} type='submit'>Entrar</button>
                    <Link to={`/register`} className={styles.linkRegister}>Cadastre-se</Link>
                </form >
                <ToastContainer theme='colored' />
            </div >
        </div >
    )
}

export default Login