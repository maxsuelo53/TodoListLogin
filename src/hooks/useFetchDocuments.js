import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    where
} from "firebase/firestore";

export const useFetchDocuments = (docCollection, search = null) => {

    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const [cancelled, setCancelled] = useState(null)


    useEffect(() => {

        async function loadData() {
            if (cancelled) return;

            setLoading(true)

            const collectionRef = await collection(db, docCollection)

            try {

                let q;

                q = await query(collectionRef, orderBy("createdAt", "desc"));
                //q = await query(collectionRef, orderBy("checkTask"));

                await onSnapshot(q, (querySnapshot) => {

                    setDocuments(
                        querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    )
                })

                setLoading(false)
            } catch (error) {
                setError(error.message)

                setLoading(false)
            }
        }

        loadData()

    }, [docCollection, search, cancelled])

    useEffect(() => {
        return () => {
            setCancelled(true)
        }
    }, [])

    return { documents, loading, error }

}