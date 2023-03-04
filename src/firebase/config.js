import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'


//CONFIGURAÇÃO FIREBASE
const firebaseConfig = {
    apiKey: "AIzaSyB8ggrR57Uu2JyJWRocE7RNizveUX1gn5Y",
    authDomain: "todolistlogin-a5e7a.firebaseapp.com",
    projectId: "todolistlogin-a5e7a",
    storageBucket: "todolistlogin-a5e7a.appspot.com",
    messagingSenderId: "452029221915",
    appId: "1:452029221915:web:a3d06b1559d89d34d9bcbe"
};


//INICIANDO FIREBASE
const app = initializeApp(firebaseConfig);

//CONEXÃO COM O BANCO
const db = getFirestore(app);

export { db };