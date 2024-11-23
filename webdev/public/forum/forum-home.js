// forum-home.js
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
        const voteButton = e.target.closest('.vote-button');

        if (voteButton) {
            const threadId = voteButton.dataset.threadId;
            const voteType = voteButton.dataset.voteType;
            const voteCountElement = voteButton.parentElement.querySelector('.vote-count');
            await handleVote(threadId, voteType, voteCountElement, voteButton);
        }
    });

    async function handleVote(threadId, voteType, voteCountElement, voteButton) {
        if (!currentUser) {
            alert('Please sign in to vote');
            return;
        }

        try {
            const token = await getCurrentUserToken();
            if (!token) {
                throw new Error('Failed to get user token');
            }

            const response = await fetch(`/api/forum/threads/${threadId}/vote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ voteType })
            });

            if (!response.ok) {
                throw new Error('Failed to vote');
            }

            const result = await response.json();
            // Update vote count and button states
            const upvoteButton = voteButton.parentElement.querySelector('.upvote-button');
            const downvoteButton = voteButton.parentElement.querySelector('.downvote-button');

            // Reset button states
            upvoteButton.classList.remove('upvoted');
            downvoteButton.classList.remove('downvoted');

            // Update button state if vote was added
            if (result.voted) {
                if (voteType === 'upvote') {
                    upvoteButton.classList.add('upvoted');
                } else {
                    downvoteButton.classList.add('downvoted');
                }
            }
            const voteCountResponse = await fetch(`/api/forum/threads/${threadId}/vote-count`);
            if (!voteCountResponse.ok) {
                throw new Error('Failed to fetch vote count');
            }
            const voteCount = await voteCountResponse.json();
            voteCountElement.textContent = voteCount;

        } catch (error) {
            console.error('Error voting:', error);
        }
    }

    async function fetchThreads() {
        try {
            // Get authentication token if user is logged in 
            let headers = {
                'Content-Type': 'application/json'
            };

            if (currentUser) {
                const token = await getCurrentUserToken();
                if (token) {
                    headers['Authorization'] = `Bearer ${token}`;
                }
            }

            const response = await fetch('/api/forum/threads', {
                headers: headers
            });

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
                                <div class="vote-controls">
                                    <button 
                                        class="vote-button upvote-button ${thread.userVote === 'upvote' ? 'upvoted' : ''}"
                                        data-thread-id="${thread.id}"
                                        data-vote-type="upvote"
                                        aria-label="Upvote thread"
                                    >
                                        ▲
                                    </button>
                                    <button 
                                        class="vote-button downvote-button ${thread.userVote === 'downvote' ? 'downvoted' : ''}"
                                        data-thread-id="${thread.id}"
                                        data-vote-type="downvote"
                                        aria-label="Downvote thread"
                                    >
                                        ▼
                                    </button>
                                    <span class="vote-count">${thread.vote_count}</span>
                                </div>
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