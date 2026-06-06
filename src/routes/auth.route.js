import express from 'express';
import authController from '../controllers/auth.controller.js';
import keyController from '../controllers/keys.controller.js';
const authRoute = express.Router();

// check api-key for all auth routes
authRoute.use(keyController.validate);

authRoute.post('/signup', authController.signup);
authRoute.post('/login', authController.login);

export default authRoute;