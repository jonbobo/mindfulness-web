import { currentUser } from './app.js';
import { getCurrentUserToken } from '../auth/firebase-auth.js';



export function renderCreateThread(app) {
    app.innerHTML = `
      <div class="forum-page">
            <div class="container">
                <h1>Create New Thread</h1>
                <form id="new-thread-form">
                    <input type="text" id="thread-title" name="title" placeholder="Thread Title" required>
                    <textarea id="thread-content" name="content" placeholder="Thread Content" required></textarea>
                    <button type="submit" class= "create-thread">Create Thread</button>
                </form>
                <p><a href="/forum" class="back-to-forum">Back to Forum</a></p>
            </div>
        </div>
    `;

    const newThreadForm = document.getElementById('new-thread-form');

    newThreadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!currentUser) {
            alert('Please sign in to create a thread.');
            return;
        }
        const formData = new FormData(newThreadForm);
        const title = formData.get('title');
        const content = formData.get('content');

        try {
            // In the submit event listener:
            const token = await getCurrentUserToken();
            if (!token) {
                throw new Error('Failed to get user token');
            }
            const response = await fetch('/api/forum/threads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Replace with actual token if using JWT
                },
                body: JSON.stringify({ title, content })
            });

            if (!response.ok) {
                throw new Error('Failed to create thread');
            }

            const result = await response.json();
            console.log('Thread created:', result);
            window.location.href = '/forum';
        } catch (error) {
            console.error('Error creating thread:', error);
            alert('Failed to create thread. Please try again.');
        }
    });
}