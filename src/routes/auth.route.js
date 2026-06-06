import express from 'express';
import authController from '../controllers/auth.controller.js';
import keyController from '../controllers/keys.controller.js';
const authRoute = express.Router();

// check api-key for all auth routes
authRoute.use(keyController.validate);

// routes
authRoute.post('/signup', authController.signup);
authRoute.post('/login', authController.login);

// check JWT for 2FA routes
authRoute.use(authController.checkJWT);
authRoute.post('/2fa/setup', authController.setup2FA);
authRoute.post('/2fa/verify', authController.verify2FA);

export default authRoute;