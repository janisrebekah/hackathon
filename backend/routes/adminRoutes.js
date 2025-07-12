// backend/routes/adminRoutes.js
import express from 'express';
import { banUser, getStatsReport, sendAnnouncement } from '../controllers/adminController.js';
import { authorizeAdmin } from '../middleware/auth.js';

const router = express.Router();

// Middleware to ensure only admins access these routes
router.use(authorizeAdmin);

// Routes
router.use(authorizeAdmin); // instead of isAdmin
router.get('/stats', getStatsReport); // ✅ Swaps + users stats
router.put('/ban/:id', banUser);      // ✅ Ban a user
router.post('/broadcast', sendAnnouncement); // ✅ Announcements

export default router;
