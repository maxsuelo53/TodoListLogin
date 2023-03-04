import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,

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

        } catch (error) {

            console.log(error.message);
            console.log(typeof error.message);

        }

        setLoading(false)
    }


    //LOGOUT
    const logout = () => {

        checkIfIsCancelled();

        signOut(auth)
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
    }


}