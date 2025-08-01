import express from 'express';
import { getNewsFeed, getUserPosts } from '../controllers/postsController.js';

const router = express.Router();

router.get('/feed', getNewsFeed);
router.get('/user/:id', getUserPosts);

export default router;