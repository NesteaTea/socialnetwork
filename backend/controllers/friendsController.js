import verify from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;

export function getCurrentUserId(req) {
    const token = req.cookies.token;
    if (!token) return null;

    try {
        const decoded = verify(token, JWT_SECRET);
        return decoded.id;
    } catch {
        return null;
    }
}

// Добавить друга
export function addFriend(req, res) {
    const db = req.db;
    const currentUserId = getCurrentUserId(req);
    const friendId = Number(req.params.id);

    if (!currentUserId || currentUserId === friendId) {
        return res.status(400).json({ message: 'Ошибка авторизации или попытка добавить себя' });
    }

    try {
        db.prepare('INSERT OR IGNORE INTO friends (user_id, friend_id) VALUES (?, ?)')
            .run(currentUserId, friendId);

        res.json({ message: 'Пользователь добавлен в друзья' });
    } catch {
        res.status(500).json({ message: 'Ошибка добавления в друзья' });
    }
}

// Удалить друга
export function removeFriend(req, res) {
    const db = req.db;
    const currentUserId = getCurrentUserId(req);
    const friendId = Number(req.params.id);

    if (!currentUserId) {
        return res.status(401).json({ message: 'Нет авторизации' });
    }

    db.prepare('DELETE FROM friends WHERE user_id = ? AND friend_id = ?')
        .run(currentUserId, friendId);

    res.json({ message: 'Удален из друзей' });
}

// Получить всех друзей текущего пользователя
export function getFriends(req, res) {
    const db = req.db;
    const currentUserId = getCurrentUserId(req);

    if (!currentUserId) {
        return res.status(401).json({ message: 'Нет авторизации' });
    }

    const friends = db.prepare(`
        SELECT u.id, u.name, u.surname, u.username, u.avatar
        FROM users u
        JOIN friends f ON f.friend_id = u.id
        WHERE f.user_id = ?
    `).all(currentUserId);

    res.json({ friends });
}

// Проверить, является ли user другом
export function checkFriendStatus(req, res) {
    const db = req.db;
    const currentUserId = getCurrentUserId(req);
    const targetId = Number(req.params.id);

    if (!currentUserId) return res.status(401).json({ message: 'Нет авторизации' });

    const exists = db.prepare('SELECT 1 FROM friends WHERE user_id = ? AND friend_id = ?')
        .get(currentUserId, targetId);

    res.json({ isFriend: !!exists });
}
