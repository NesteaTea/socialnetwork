import express from 'express';
import { sendMessage, markAsRead, getMessages } from '../controllers/messagesController.js';

const router = express.Router();

router.post('/', sendMessage);
router.get('/:chatId', getMessages);

export default router;
