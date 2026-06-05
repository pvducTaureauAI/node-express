import express from 'express';
import authController from '../controllers/auth.controller.js';
const authRoute = express.Router();

authRoute.post('/signup', authController.signup);

export default authRoute;