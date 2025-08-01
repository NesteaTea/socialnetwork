import express from 'express';
import connectDB from '../config/db.js';

const router = express.Router();
const db = connectDB();

// GET /api/users/search?q=...
router.get('/search', (req, res) => {
    const query = req.query.q;

    if (!query || query.trim() === '') return res.json([]);

    const stmt = db.prepare(`
    SELECT id, username, name, surname
    FROM users
    WHERE username LIKE ?
       OR name LIKE ?
       OR surname LIKE ?
    LIMIT 20
  `);

    const users = stmt.all(`%${query}%`, `%${query}%`, `%${query}%`);
    res.json(users);
});

export default router;
