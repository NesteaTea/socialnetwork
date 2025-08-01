import dotenv from 'dotenv';
dotenv.config();

import { hash as _hash, compare } from 'bcryptjs';
import pkg from 'jsonwebtoken';
const { sign, verify } = pkg;

const JWT_SECRET = process.env.JWT_SECRET;

export async function register(req, res) {
    const db = req.db;
    const { name, surname, username, email, password } = req.body;

    if (!name || !surname || !username || !email || !password) {
        return res.status(400).json({ message: 'Заполните все поля' });
    }

    const usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!usernameRegex.test(username)) {
        return res.status(400).json({ message: 'Имя пользователя может содержать только латинские буквы и цифры' });
    }

    try {
        const hash = await _hash(password, 10);

        db.prepare(`
            INSERT INTO users (name, surname, username, email, password)
            VALUES (?, ?, ?, ?, ?)
        `).run(name, surname, username, email, hash);

        res.json({ message: 'Регистрация успешна' });
    } catch (err) {
        const message = err.message || '';

        if (message.includes('users.username')) {
            return res.status(400).json({ message: 'Имя пользователя уже занято', field: 'username' });
        }

        if (message.includes('users.email')) {
            return res.status(400).json({ message: 'Email уже зарегистрирован', field: 'email' });
        }

        return res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
}


export async function login(req, res) {
    const db = req.db;
    const { email, password } = req.body;
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!user) return res.status(400).json({ message: 'Неверный email или пароль' });
    const valid = await compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Неверный email или пароль' });

    const token = sign(
        { id: user.id, email: user.email, role: user.role || 'user' },
        JWT_SECRET,
        { expiresIn: '7d' }
    );
    res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ user: { name: user.name, surname: user.surname, username: user.username, email: user.email } });
}

export async function profile(req, res) {
    const db = req.db;
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Нет токена' });
    try {
        const decoded = verify(token, JWT_SECRET);
        const user = db.prepare('SELECT id, name, surname, username, email, created_at FROM users WHERE id = ?').get(decoded.id);
        res.json({ user });
    } catch {
        res.status(401).json({ message: 'Неверный токен' });
    }
}

export function profileByUsername(req, res) {
    const db = req.db;
    const { username } = req.params;

    const user = db.prepare('SELECT id, name, surname, username, email, created_at FROM users WHERE username = ?').get(username);

    if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
    }

    res.json({ user });
}

export function logout(req, res) {
    res.clearCookie('token');
    res.json({ message: 'Выход выполнен' });
}