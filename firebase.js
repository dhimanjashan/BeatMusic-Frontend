import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyD2QR9x9F5rAHgeGk-Os5rpQIQaRvL564k",
    authDomain: "beatmusic-50ecf.firebaseapp.com",
    projectId: "beatmusic-50ecf",
    storageBucket: "beatmusic-50ecf.appspot.com", // ✅ Corrected
    messagingSenderId: "929073002382",
    appId: "1:929073002382:web:574aea0df31aba25f316df",
    measurementId: "G-BMJHBYX3F9"
};

const app = initializeApp(firebaseConfig);
export default app;
