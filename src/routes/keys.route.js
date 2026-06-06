import express from 'express';
import keyController from '../controllers/keys.controller.js';
const keyRoute = express.Router();

keyRoute.post('/add', keyController.add);

export default keyRoute;