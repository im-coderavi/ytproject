import express from 'express';
import { upgradeSubscription, createPayPalOrder, capturePayPalOrder } from '../controllers/SubscriptionController.js';
import protect from '../middlewares/auth.js';
const router = express.Router();
router.post('/upgrade', protect, upgradeSubscription);
router.post('/create-order', protect, createPayPalOrder);
router.post('/capture-order', protect, capturePayPalOrder);
export default router;
