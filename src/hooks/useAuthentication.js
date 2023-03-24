import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
    updatePassword,

} from 'firebase/auth';

import { db } from '../firebase/config'

import { useState, useEffect } from 'react';

export const useAuthentication = () => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    //CLEANUP
    //DEAL WITH MEMORY LEAK
    const [cancelled, setCancelled] = useState(false)


    const auth = getAuth();

    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }


    //REGISTER
    const createUser = async (data) => {
        checkIfIsCancelled();
        setLoading(true);
        setError(null);

        try {

            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.displayName
            })

            return user;

        } catch (errorSystem) {

            let systemErrorMessage;

            if (errorSystem.message.includes("email-already")) {
                systemErrorMessage = "O e-mail já está cadastrado. Não foi possível cadastrar o usuário!"
            } else if (errorSystem.message.includes("password")) {
                systemErrorMessage = "A senha deve conter no mínimo 6 dígitos!"
            }
            setError(systemErrorMessage);


        }

        setLoading(false)
    }

    //LOGIN
    const loginUser = async (data) => {

        checkIfIsCancelled();
        setLoading(true);
        setError(false);

        try {

            await signInWithEmailAndPassword(auth, data.email, data.password)

        } catch (error) {

            let systemErrorMessage;

            if (error.message.includes("user-not-found") || error.message.includes("password")) {
                systemErrorMessage = "Usuário ou senha incorretos!"
            } else if (error.message.includes("password")) {
                systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde."
            }
            setError(systemErrorMessage);
            setLoading(false);
        }

    }

    //LOGOUT
    const logout = () => {

        checkIfIsCancelled();

        signOut(auth)
    }

    //RESET PASSWORD
    const resetPasswordUuser = (newPassword) => {
        const user = auth.currentUser;

        user.updatePassword(newPassword);
    }


    useEffect(() => {
        return () => { setCancelled(true) }
    }, [])




    return {
        auth,
        createUser,
        logout,
        error,
        loading,
        loginUser
    }


}