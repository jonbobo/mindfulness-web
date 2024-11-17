import { currentUser } from './app.js';
import { getCurrentUserToken } from '../auth/firebase-auth.js';

export async function renderThread(app, threadId) {
    app.innerHTML = `
       <div class="forum-page">
            <div class="container">
                <h1 id="thread-title"></h1>
                <div id="thread-content"></div>
                <div id="comments"></div>
                <div id="new-comment-form">
                    <textarea id="comment-content" placeholder="Add a comment..."></textarea>
                    <button id="submit-comment">Submit</button>
                </div>
                <p><a href="/forum" class="back-to-forum">Back to Forum</a></p>
            </div>
        </div>
    `;

    const threadTitle = document.getElementById('thread-title');
    const threadContent = document.getElementById('thread-content');
    const comments = document.getElementById('comments');
    const commentContent = document.getElementById('comment-content');
    const submitComment = document.getElementById('submit-comment');

    async function fetchThread() {
        try {
            const response = await fetch(`/api/forum/threads/${threadId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch thread');
            }
            const thread = await response.json();
            threadTitle.textContent = thread.title;
            threadContent.innerHTML = `
                <p>${thread.content}</p>
                <small>Posted by ${thread.user_id} on ${new Date(thread.created_at).toLocaleString()}</small>
            `;
            comments.innerHTML = thread.comments.map(comment => `
                <div class="comment">
                    <p>${comment.content}</p>
                    <small>Posted by ${comment.user_id} on ${new Date(comment.created_at).toLocaleString()}</small>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error fetching thread:', error);
            app.innerHTML = '<p>Error loading thread. Please try again later.</p>';
        }
    }

    submitComment.addEventListener('click', async () => {
        if (!currentUser) {
            alert('Please sign in to comment.');
            return;
        }
        const content = commentContent.value.trim();
        if (content) {
            try {
                // Get the current Firebase ID token
                const token = await getCurrentUserToken();
                if (!token) {
                    throw new Error('Failed to get authentication token');
                }
                const response = await fetch(`/api/forum/threads/${threadId}/comments`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // Replace with actual token if using JWT
                    },
                    body: JSON.stringify({ content })
                });
                if (!response.ok) {
                    throw new Error('Failed to post comment');
                }
                commentContent.value = '';
                await fetchThread();
            } catch (error) {
                console.error('Error posting comment:', error);
                alert('Failed to post comment. Please try again.');
            }
        }
    });

    await fetchThread();
}