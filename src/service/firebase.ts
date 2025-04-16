import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/web-extension";

const firebaseConfig = {
    apiKey: "AIzaSyAqBQYhcXiKP8C-8DzHZvrcs8uMU97dnRA",
    authDomain: "form-965f6.firebaseapp.com",
    projectId: "form-965f6",
    storageBucket: "form-965f6.firebasestorage.app",
    messagingSenderId: "906817215640",
    appId: "1:906817215640:web:52e1b04873e56d82e704ed",
    measurementId: "G-49K7R9PX35"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

