export async function getNewsFeed(req, res) {
    const db = req.db;
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: 'Нет токена' });

    try {
        const decoded = verify(token, JWT_SECRET);
        const currentUserId = decoded.id;

        const posts = db.prepare(`
            SELECT posts.*, users.name, users.surname, users.username, users.avatar
            FROM posts
            JOIN friends ON friends.friend_id = posts.user_id
            JOIN users ON users.id = posts.user_id
            WHERE friends.user_id = ?
            ORDER BY posts.created_at DESC
        `).all(currentUserId);

        res.json({ posts });
    } catch (err) {
        res.status(401).json({ message: 'Неверный токен' });
    }
}

export async function getUserPosts(req, res) {
    const db = req.db;
    const userId = req.params.id;

    const posts = db.prepare(`
        SELECT posts.*, users.name, users.surname, users.username, users.avatar
        FROM posts
        JOIN users ON users.id = posts.user_id
        WHERE posts.user_id = ?
        ORDER BY posts.created_at DESC
    `).all(userId);

    res.json({ posts });
}

