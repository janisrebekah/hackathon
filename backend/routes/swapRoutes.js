// backend/routes/swapRoutes.js
import express from 'express';
import {
  createSwapRequest,
  getUserSwaps,
  getSwapRequests,
  acceptSwap,
  rejectSwap,
  deleteSwap,
  rateSwap
} from '../controllers/swapController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.use(isAuthenticated);

router.post('/', createSwapRequest);
router.get('/my-swaps', getUserSwaps);
router.get('/requests', getSwapRequests);
router.put('/accept/:swapId', acceptSwap);
router.put('/reject/:swapId', rejectSwap);
router.delete('/:swapId', deleteSwap);
router.post('/rate/:swapId', rateSwap);

export default router;
