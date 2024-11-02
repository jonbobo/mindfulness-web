import { renderForum } from './forum-home.js';
import { renderThread } from './thread.js';
import { renderCreateThread } from './create-thread.js';
import { auth, logout, isLoggedIn, getCurrentUserId, initializeAuthStateListener } from '../auth/firebase-auth.js';

const app = document.getElementById('app');
let currentUser = null;

async function router() {
    const path = window.location.pathname;
    try {
        if (path === '/forum' || path === '/forum/') {
            await renderForum(app);
        } else if (path.startsWith('/forum/thread/')) {
            const threadId = path.split('/')[3];
            await renderThread(app, threadId);
        } else if (path === '/forum/create-thread') {
            await renderCreateThread(app);
        } else {
            app.innerHTML = '<h1>404 - Page Not Found</h1>';
        }
        initializeAuthStateListener();
        window.logout = logout;
    } catch (error) {
        console.error('Error during routing:', error);
    }
}



function checkAuth() {
    return new Promise((resolve) => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                currentUser = { id: user.uid, email: user.email };
            } else {
                currentUser = null;
            }
            resolve();
        });
    });
}

document.body.addEventListener('click', async (e) => {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('/forum')) {
        e.preventDefault();
        const href = e.target.getAttribute('href');
        history.pushState(null, '', href);
        await router();
    }
});

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', async () => {
    await checkAuth();
    await router();
});



// Export functions that might be needed in other modules
export { currentUser, isLoggedIn, getCurrentUserId };