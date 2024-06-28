import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { getFirestore, doc, setDoc, getDoc, query, where, collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDm7Jzmm5btAOWTcnoaT-qLHew9Gkq3M8o",
    authDomain: "mindfulness-42398.firebaseapp.com",
    projectId: "mindfulness-42398",
    storageBucket: "mindfulness-42398.appspot.com",
    messagingSenderId: "939033964266",
    appId: "1:939033964266:web:5a3b9fcf1ba835aa0df193",
    measurementId: "G-WTMSMTF60D"
};
