import express from "express";
import {
  registerController,
  loginContoller,
} from "../controller/authController.js"; // Added .js to the path

const router = express.Router();

// Route 1: Register
router.post("/register", registerController);

//Route 2 :login
router.post("/login", loginContoller);

export default router;
