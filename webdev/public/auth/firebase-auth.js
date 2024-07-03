import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { getFirestore, doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

// Your web app's Firebase configuration
// In a production environment, consider using environment variables for these values
const firebaseConfig = {
    apiKey: "AIzaSyDm7Jzmm5btAOWTcnoaT-qLHew9Gkq3M8o",
    authDomain: "mindfulness-42398.firebaseapp.com",
    projectId: "mindfulness-42398",
    storageBucket: "mindfulness-42398.appspot.com",
    messagingSenderId: "939033964266",
    appId: "1:939033964266:web:5a3b9fcf1ba835aa0df193",
    measurementId: "G-WTMSMTF60D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Helper function to show alerts
function showAlert(message, type = 'info') {
    // You could replace this with a more sophisticated alert system
    alert(message);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isStrongPassword(password) {
    // Require at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

// Registration
const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = signupForm['signup-username'].value;
        const email = signupForm['signup-email'].value;
        const password = signupForm['password'].value;
        const confirmPassword = signupForm['confirm-password'].value;

        if (!isValidEmail(email)) {
            showAlert("Invalid Email Format", 'error');
            return;
        }

        if (!isStrongPassword(password)) {
            showAlert("Password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, a number, and a special character!", 'error');
            return;
        }

        if (password !== confirmPassword) {
            showAlert("Passwords don't match!", 'error');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await setDoc(doc(db, "usernames", user.uid), { username, email });
            showAlert('Registration successful!', 'success');
            window.location.href = 'login.html';
        } catch (error) {
            showAlert('Registration Error: ' + error.message, 'error');
        }
    });
}

// Login
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const emailOrUsername = loginForm['login-username'].value;
        const password = loginForm['password'].value;
        const rememberMe = loginForm['remember-me'].checked;

        let email = emailOrUsername;
        if (!isValidEmail(emailOrUsername)) {
            // If it's not an email, assume it's a username and fetch the corresponding email
            try {
                const usersRef = doc(db, "usernames", emailOrUsername);
                const userDoc = await getDoc(usersRef);
                if (userDoc.exists()) {
                    email = userDoc.data().email;
                } else {
                    showAlert("User not found", 'error');
                    return;
                }
            } catch (error) {
                showAlert('Error fetching user data: ' + error.message, 'error');
                return;
            }
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            if (rememberMe) {
                // Implement remember me functionality
                // This could involve storing a token in localStorage
                localStorage.setItem('rememberMe', userCredential.user.uid);
            }
            showAlert('Login successful!', 'success');
            window.location.href = 'dashboard.html';
        } catch (error) {
            showAlert('Login Error: ' + error.message, 'error');
        }
    });
}

// Forgot Password
const emailEntryForm = document.getElementById('email-entry');
if (emailEntryForm) {
    emailEntryForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = emailEntryForm['email'].value;

        if (!isValidEmail(email)) {
            showAlert("Invalid email format!", 'error');
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            showAlert('Password reset email sent. Check your inbox.', 'success');
            // Add a link or button to return to login page
            const returnLink = document.createElement('a');
            returnLink.href = 'login.html';
            returnLink.textContent = 'Return to Login';
            emailEntryForm.appendChild(returnLink);
        } catch (error) {
            showAlert('Password Reset Error: ' + error.message, 'error');
        }
    });
}

// Check for remembered user on page load
window.addEventListener('load', () => {
    const rememberedUser = localStorage.getItem('rememberMe');
    if (rememberedUser && window.location.pathname.includes('login.html')) {
        // Implement auto-login or pre-fill the login form
        // For security reasons, you might want to verify the token server-side
        showAlert('Welcome back!', 'info');
    }
});