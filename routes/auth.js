import express from "express";
import {
  registerController,
  loginContoller,
  testcontroller,
} from "../controller/authController.js"; // Added .js to the path
import { fetchuser, isAdmin } from "../midleware/fetchuser.js";

const router = express.Router();

// Route 1: Register
router.post("/register", registerController);

//Route 2 :login
router.post("/login", loginContoller);

//Route 3 :test
router.get("/test", fetchuser, isAdmin, testcontroller);

export default router;
