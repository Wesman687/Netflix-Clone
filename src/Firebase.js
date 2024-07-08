

import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const firebaseConfig = {
    apiKey: "AIzaSyCV_wU01_5uDbCd9IO1P92uWG0Eg0sqfE4",
    authDomain: "netflix-clone-8798c.firebaseapp.com",
    projectId: "netflix-clone-8798c",
    storageBucket: "netflix-clone-8798c.appspot.com",
    messagingSenderId: "498536584284",
    appId: "1:498536584284:web:4f2f3115c7cf8c73130299"
  };


const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

const signup = async (name, email, password)=> {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch(error){
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }


}

const login = async (email, password) => {
    try{
        await signInWithEmailAndPassword(auth, email, password)

    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))

    }
    
}

const logout = ()=> {
    signOut(auth)
}

export { auth, db, login, signup, logout}