export async function renderForum(app) {
    app.innerHTML = `
        <div class="container">
            <h1>Mindfulness Forum</h1>
            <div id="thread-list"></div>
            <a href="/forum/create-thread" class="create-thread-button">Create New Thread</a>
        </div>
    `;

    const threadList = document.getElementById('thread-list');

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
                            <a href="/forum/thread/${thread.id}" class="thread-title">${thread.title}</a>
                            <small>Posted by ${thread.user_id} on ${new Date(thread.created_at).toLocaleString()}</small>
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