import express from 'express';
import { registerController } from '../controller/authController.js'; // Added .js to the path

const router = express.Router();

// Route 1: Register
router.post('/register', registerController);

export default router;
