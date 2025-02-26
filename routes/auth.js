import express from "express";
// import {
//   registerController,
//   loginController,
//   testcontroller,
//   fetchalluser,
// } from "../controller/authcontroller.js"; // Added .js to the path
import { isAdmin, fetchuser } from "../midleware/fetchuser.js";
import {
  registerController,
  loginController,
  testcontroller,
  forgotPasswordController,
  updateUserProfile,
  OrderForAllUser,
  UpdateOrderStatus,
} from "../controller/authcontroller.js"; // Added .js to the path

const router = express.Router();

// Route 1: Register
router.post("/register", registerController);

// Route 2: Login
router.post("/login", loginController); // Fixed the typo here

// Route 3: Test
router.get("/test", fetchuser, isAdmin, testcontroller);

// Route 4: protected-auth
router.get("/user-auth", fetchuser, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get("/admin-auth", fetchuser, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//forgot-password
router.post("/forgot-password", forgotPasswordController);

router.put("/update-profile", fetchuser, updateUserProfile);

router.get("/Orders", fetchuser, OrderForAllUser);

router.put("/Orders/:orderId", fetchuser, isAdmin, UpdateOrderStatus);

export default router;
