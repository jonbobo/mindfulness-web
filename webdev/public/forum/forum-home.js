import { currentUser } from './app.js';
import { getCurrentUserToken } from '../auth/firebase-auth.js';
export async function renderForum(app) {
    app.innerHTML = `
        <div class="forum-page">
            <div class="container">
                <h1>Mindfulness Forum</h1>
                <div id="thread-list"></div>
                <a href="/forum/create-thread" class="create-thread-button">Create New Thread</a>
            </div>
        </div>
    `;

    const threadList = document.getElementById('thread-list');

    threadList.addEventListener('click', async (e) => {
        const upVoteButton = e.target.closest('.upvote-button');

        if (upVoteButton) {
            const threadId = upVoteButton.dataset.threadId;
            const voteCountElement = upVoteButton.parentElement.querySelector('.vote-count');
            await handleUpvote(threadId, voteCountElement, upVoteButton);


        }
    });
    async function handleUpvote(threadId, voteCountElement, upVoteButton) {
        if (!currentUser) {
            alert('Please sign in to upvote');
            return;
        }
        try {
            const token = await getCurrentUserToken();
            if (!token) {
                throw new Error('Failed to get user token');
            }
            const response = await fetch(`api/forum/threads/${threadId}/upvote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to upvote');
            }
            const result = await response.json();
            const currentCount = parseInt(voteCountElement.textContent);
            const newCount = result.voted ? currentCount + 1 : currentCount - 1;
            voteCountElement.textContent = newCount;
            upVoteButton.classList.toggle('voted', result.voted);

        } catch (error) {
            console.error('Error upvoting:', error);
        }
    }

    async function fetchThreads() {
        try {
            const response = await fetch('/api/forum/threads');
            if (!response.ok) {
                throw new Error('Failed to fetch threads');
            }
            const threads = await response.json();
            threadList.innerHTML = `
            <ul class="thread-list">
                ${threads.map(thread => `
                    <li class="thread-item">
                        <div class="thread-content">
                            <a href="/forum/thread/${thread.id}" class="thread-title">${thread.title}</a>
                            <small>
                                <button 
                                    class="upvote-button ${thread.hasVoted ? 'voted' : ''}"
                                    data-thread-id="${thread.id}"
                                    aria-label="Upvote thread"
                                >
                                    ▲
                                </button>
                                <span class="vote-count">${thread.vote_count}</span>
                                Posted by ${thread.user_id} on ${new Date(thread.created_at).toLocaleString()}
                            </small>
                        </div>
                    </li>
                `).join('')}
            </ul>
        `;
        } catch (error) {
            console.error('Error fetching threads:', error);
            threadList.innerHTML = '<p>Error loading threads. Please try again later.</p>';
        }
    }

    await fetchThreads();
}