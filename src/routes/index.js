import express from 'express';
import authRoute from './auth.route.js';
import keyRoute from './keys.route.js';
const router = express.Router();

router.use('/auth', authRoute);
router.use('/api-keys', keyRoute);

export default router;