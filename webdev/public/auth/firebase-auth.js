import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    setPersistence,
    browserSessionPersistence,
    browserLocalPersistence,
    signOut,
    onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
    doc,
    setDoc,
    getDoc
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Helper function to show alerts
function showAlert(message, type = 'info') {
    alert(message);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isStrongPassword(password) {
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

        async function isUsernameAvailable(username) {
            try {
                const usernameQuery = query(
                    collection(db, "usernames"),
                    where("username", "==", username.toLowerCase())
                );
                const querySnapshot = await getDocs(usernameQuery);
                return querySnapshot.empty;
            } catch (error) {
                console.error("Error checking username availability:", error);
                throw error;
            }
        }

        try {
            const usernameAvailable = await isUsernameAvailable(username);
            if (!usernameAvailable) {
                showAlert("Username is already taken. Please choose a different username.", 'error');
                return;
            }
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await setDoc(doc(db, "usernames", user.uid), { username, email });
            // Sync with MySQL database
            const token = await user.getIdToken();
            await fetch('/api/forum/users/sync', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    uid: user.uid,
                    email: email,
                    username: username
                })
            });

            showAlert('Registration successful!', 'success');
            window.location.href = 'login.html';
        } catch (error) {
            showAlert('Registration Error: ' + error.message, 'error');
        }
    });
}

// Login Form Handling
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const emailOrUsername = loginForm['login-username'].value;
        const password = loginForm['password'].value;
        const rememberMeCheckbox = document.getElementById('remember-me');
        const rememberMe = rememberMeCheckbox ? rememberMeCheckbox.checked : false;

        let email = emailOrUsername;

        try {
            if (!isValidEmail(emailOrUsername)) {
                const usernameQuery = query(collection(db, "usernames"), where("username", "==", emailOrUsername));
                const querySnapshot = await getDocs(usernameQuery);

                if (!querySnapshot.empty) {
                    email = querySnapshot.docs[0].data().email;
                } else {
                    throw new Error("Username not found");
                }
            }

            const persistence = rememberMe ? browserLocalPersistence : browserSessionPersistence;
            await setPersistence(auth, persistence);
            console.log('Persistence set to:', rememberMe ? 'Local' : 'Session');

            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('User logged in:', auth.currentUser ? 'Yes' : 'No');

            showAlert('Login successful!', 'success');
            window.location.href = '../index.html';
        } catch (error) {
            console.error('Login Error:', error);
            console.error('Error Code:', error.code);
            console.error('Error Message:', error.message);
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
            const returnLink = document.createElement('a');
            returnLink.href = 'login.html';
            returnLink.textContent = 'Return to Login';
            emailEntryForm.appendChild(returnLink);
        } catch (error) {
            showAlert('Password Reset Error: ' + error.message, 'error');
        }
    });
}

// Function to update UI based on auth state
export function initializeAuthStateListener() {
    onAuthStateChanged(auth, (user) => {
        updateUI(user);
    });
}

// Function to update UI
async function updateUI(user) {
    const userStatusElement = document.getElementById('user-status');
    if (userStatusElement) {
        if (user) {
            // User is signed in
            const username = await getUserUsername(user.uid);
            userStatusElement.innerHTML = `
                <a class="btn">
                    <i class="fa fa-user"></i> ${username}
                </a>
                <ul class="dropdown">
                    <li><a href="#">Profile</a></li>
                    <li><a href="#" onclick="logout(); return false;">Logout</a></li>
                </ul>
            `;
        } else {
            // No user is signed in
            userStatusElement.innerHTML = `
                <a class="btn" href="auth/login.html">
                    <i class="fa fa-user"></i> Log In
                </a>
            `;
        }
    }
}

// Function to get username from Firestore
async function getUserUsername(uid) {
    const docRef = doc(db, "usernames", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data().username;
    } else {
        return "User";
    }
}

// Get current user token
export async function getCurrentUserToken() {
    const user = auth.currentUser;
    if (user) {
        try {
            return await user.getIdToken();
        } catch (error) {
            console.error('Error getting user token:', error);
            return null;
        }
    }
    return null;
}

// Check if user is logged in
export function isLoggedIn() {
    return !!auth.currentUser;
}

// Get current user ID
export function getCurrentUserId() {
    return auth.currentUser ? auth.currentUser.uid : null;
}

// Logout function
export async function logout() {
    try {
        await signOut(auth);
        console.log('Logged out successfully');
        updateUI(null);  // Update UI after logout
        window.location.href = '../index.html';
    } catch (error) {
        console.error('Logout Error:', error);
        showAlert('Logout Error: ' + error.message, 'error');
    }
}

// Export auth object and other necessary functions
export { auth, db };