import express from 'express';
import {
  createPost,
  getPosts,
  publishPost
} from '../controllers/posts.js';

const router = express.Router();

router.post('/', createPost);
router.get('/', getPosts);
router.post('/publish/:id', publishPost);

export default router;