const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

module.exports = (db) => {
    const authenticateToken = async (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token == null) return res.status(401).json({ error: 'No token provided' });

        try {
            const decodedToken = await admin.auth().verifyIdToken(token);
            req.user = decodedToken;
            next();
        } catch (error) {
            console.error('Error verifying token:', error);
            return res.status(403).json({ error: 'Invalid token' });
        }
    };
    router.post('/users/sync', authenticateToken, async (req, res) => {
        const { uid, email, username } = req.body;

        try {
            // Check if user exists
            const [existingUsers] = await db.execute(
                'SELECT * FROM users WHERE firebase_uid = ?',
                [uid]
            );

            if (existingUsers.length === 0) {
                // User doesn't exist, create new user
                await db.execute(
                    'INSERT INTO users (firebase_uid, email, username) VALUES (?, ?, ?)',
                    [uid, email, username]
                );
                res.status(201).json({ message: 'User created successfully' });
            } else {
                // User exists, update their information
                await db.execute(
                    'UPDATE users SET email = ?, username = ? WHERE firebase_uid = ?',
                    [email, username, uid]
                );
                res.json({ message: 'User updated successfully' });
            }
        } catch (error) {
            console.error('Error syncing user:', error);
            res.status(500).json({ error: 'Error syncing user' });
        }
    });

    router.get('/threads', async (req, res) => {
        try {
            const [threads] = await db.execute(`
                SELECT t.id, t.title, t.created_at, 
                       IFNULL(u.username, 'Unknown User') as user_id
                FROM threads t
                LEFT JOIN users u ON t.user_id = u.firebase_uid
                ORDER BY t.created_at DESC
            `);
            res.json(threads);
        } catch (error) {
            console.error('Error fetching threads:', error);
            res.status(500).json({ error: 'Error fetching threads' });
        }
    });

    router.get('/threads/:id', async (req, res) => {
        try {
            const [threads] = await db.execute(`
                SELECT t.*, IFNULL(u.username, 'Unknown User') as user_id
                FROM threads t
                LEFT JOIN users u ON t.user_id = u.firebase_uid
                WHERE t.id = ?
            `, [req.params.id]);

            if (threads.length === 0) {
                return res.status(404).json({ error: 'Thread not found' });
            }

            const thread = threads[0];

            const [comments] = await db.execute(`
                SELECT c.*, IFNULL(u.username, 'Unknown User') as user_id
                FROM comments c
                LEFT JOIN users u ON c.user_id = u.firebase_uid
                WHERE c.thread_id = ?
                ORDER BY c.created_at ASC
            `, [req.params.id]);

            res.json({ ...thread, comments });
        } catch (error) {
            console.error('Error fetching thread:', error);
            res.status(500).json({ error: 'Error fetching thread' });
        }
    });

    router.post('/threads', authenticateToken, async (req, res) => {
        const { title, content } = req.body;
        const userId = req.user.uid;

        try {
            const [result] = await db.execute(
                'INSERT INTO threads (title, content, user_id) VALUES (?, ?, ?)',
                [title, content, userId]
            );
            res.status(201).json({ id: result.insertId, title, content, user_id: userId });
        } catch (error) {
            console.error('Error creating thread:', error);
            res.status(500).json({ error: 'Error creating thread' });
        }
    });

    router.post('/threads/:id/comments', authenticateToken, async (req, res) => {
        const { content } = req.body;
        const threadId = req.params.id;
        const userId = req.user.uid;

        try {
            const [result] = await db.execute(
                'INSERT INTO comments (thread_id, user_id, content) VALUES (?, ?, ?)',
                [threadId, userId, content]
            );
            res.status(201).json({ id: result.insertId, thread_id: threadId, user_id: userId, content });
        } catch (error) {
            console.error('Error creating comment:', error);
            res.status(500).json({ error: 'Error creating comment' });
        }
    });

    router.get('/search', async (req, res) => {
        const { query } = req.query;
        try {
            const [threads] = await db.execute(`
                SELECT t.id, t.title, t.created_at, 
                       IFNULL(u.username, 'Unknown User') as user_id
                FROM threads t
                LEFT JOIN users u ON t.user_id = u.firebase_uid
                WHERE t.title LIKE ? OR t.content LIKE ?
                ORDER BY t.created_at DESC
            `, [`%${query}%`, `%${query}%`]);
            res.json(threads);
        } catch (error) {
            console.error('Error searching threads:', error);
            res.status(500).json({ error: 'Error searching threads' });
        }
    });

    return router;
};