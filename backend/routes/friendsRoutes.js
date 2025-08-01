import express from 'express';
import {
    addFriend,
    removeFriend,
    getFriends,
    checkFriendStatus
} from '../controllers/friendsController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/:id', addFriend);
router.delete('/:id', removeFriend);
router.get('/', getFriends);
router.get('/:id/status', checkFriendStatus);

export default router;
