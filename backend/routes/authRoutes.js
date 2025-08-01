import { Router } from 'express';
import { register, login, profile, logout, profileByUsername } from '../controllers/authController.js';
const router = Router();

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Регистрация пользователя
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               surname: { type: string }
 *               username: { type: string }
 *               email: { type: string }
 *               password: { type: string }
 *     responses:
 *       200:
 *         description: Регистрация успешна
 *       400:
 *         description: Ошибка регистрации
 */
router.post('/register', register);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Авторизация пользователя
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *     responses:
 *       200:
 *         description: Успешная авторизация
 *       400:
 *         description: Неверный email или пароль
 */
router.post('/login', login);

/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Получить профиль пользователя (требуется токен)
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Данные пользователя
 *       401:
 *         description: Нет токена или токен невалиден
 */

router.get('/profile/:username', profileByUsername);
router.get('/profile', profile);

router.post('/logout', logout);

export default router;