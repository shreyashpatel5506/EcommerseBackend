import express from "express";
import  {fetchuser , isAdmin } from "../middleware/fetchuser.js"
import {
  registerSendOTP,
  registerVerifyOTP,
  loginController,
  testcontroller,
  forgotPasswordSendOTP,
  forgotPasswordVerifyOTP,
  updateUserProfile,
  OrderForAllUser,
  UpdateOrderStatus,
  fetchAllUsersController,
} from "../controller/authcontroller.js";

const router = express.Router();

// Route 1: Register - Send OTP
router.post("/register/send-otp", registerSendOTP);

// Route 2: Register - Verify OTP & Create Account
router.post("/register/verify-otp", registerVerifyOTP);

// Route 3: Login
router.post("/login", loginController);

// Route 4: Test Protected Route
router.get("/test", fetchuser, isAdmin, testcontroller);

// Route 5: User Authentication Check
router.get("/user-auth", fetchuser, (req, res) => {
  res.status(200).send({ ok: true });
});

// Route 6: Admin Authentication Check
router.get("/admin-auth", fetchuser, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// Route 7: Forgot Password - Send OTP
router.post("/forgot-password/send-otp", forgotPasswordSendOTP);

// Route 8: Forgot Password - Verify OTP & Reset Password
router.post("/forgot-password/verify-otp", forgotPasswordVerifyOTP);

// Route 9: Update User Profile
router.put("/update-profile", fetchuser, updateUserProfile);

// Route 10: Fetch All Users
router.get("/users", fetchuser, isAdmin, fetchAllUsersController);

// Route 11: Get All Orders for Users
router.get("/orders", fetchuser, OrderForAllUser);

// Route 12: Update Order Status (Admin Only)
router.put("/orders/:orderId", fetchuser, isAdmin, UpdateOrderStatus);

export default router;
