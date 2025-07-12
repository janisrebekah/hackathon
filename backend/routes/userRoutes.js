// backend/routes/userRoutes.js
import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  makeProfilePublicOrPrivate,
  searchUsers
} from '../controllers/userController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.use(isAuthenticated);

router.get('/me', getUserProfile);
router.put('/update', updateUserProfile);
router.put('/visibility', makeProfilePublicOrPrivate);
router.get('/search', searchUsers);

export default router;
