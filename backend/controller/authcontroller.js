import Usermodels from "../models/Usermodels.js";
import Payment from "../models/Payment.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import axios from "axios";


const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";
const OTP_EXPIRATION = 5 * 60 * 1000; // 5 minutes
const otpStore = new Map();

export const sendOTP = async (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  otpStore.set(email, {
    otp,
    expiresAt: Date.now() + OTP_EXPIRATION,
  });

  try {
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Virtual Assistant",
          email: process.env.BREVO_SENDER, // verified sender
        },
        to: [
          {
            email,
          },
        ],
        subject: "🔐 Your OTP Code",
        htmlContent: `
          <h2>Your OTP is ${otp}</h2>
          <p>This OTP is valid for 5 minutes.</p>
        `,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
        timeout: 10000,
      }
    );

    return true;
  } catch (error) {
    console.error(
      "Brevo API OTP error:",
      error.response?.data || error.message
    );
    throw new Error("OTP send failed");
  }
};

// Register - Send OTP
export const registerSendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });

    // console.log(process.env.EMAIL_USER);
    await sendOTP(email);
    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Error sending OTP" });
  }
};

// Register - Verify OTP and create user
export const registerVerifyOTP = async (req, res) => {
  try {
    const { name, email, password, address, role, phone, answer, otp } =
      req.body;
    if (
      !name ||
      !email ||
      !password ||
      !address ||
      !role ||
      !phone ||
      !answer ||
      !otp
    )
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });

    const storedOTP = otpStore.get(email);
    if (!storedOTP || storedOTP.otp !== otp || storedOTP.expiresAt < Date.now())
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Usermodels.create({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      role,
      answer,
    });
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "196h" });
    otpStore.delete(email);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Error registering user" });
  }
};
// Forgot Password - Send OTP
export const forgotPasswordSendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Usermodels.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Email not found" });

    await sendOTP(email);
    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Error sending OTP" });
  }
};

// Forgot Password - Verify OTP
export const forgotPasswordVerifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp)
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });

    const storedOTP = otpStore.get(email);
    if (!storedOTP || storedOTP.otp !== otp || storedOTP.expiresAt < Date.now())
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP" });

    otpStore.delete(email);
    res
      .status(200)
      .json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Error verifying OTP" });
  }
};

// Protected Test Route Controller
export const testcontroller = (req, res) => {
  console.log("Protected Route Accessed");
  res.json({ success: true, message: "You have accessed a protected route!" });
};

// Fetch All Users
export const fetchAllUsersController = async (req, res) => {
  try {
    const users = await Usermodels.find();
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Error fetching users." });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user existence
    const user = await Usermodels.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password." });
    }

    // Compare passwords
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password." });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "196h" });

    return res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone, // ✅ Add this
        address: user.address,
      },
    });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Error in login. Please try again." });
  }
};
export const updateUserProfile = async (req, res) => {
  try {
    const { name, email, address } = req.body;
    const userId = req.user._id;

    // Validation for missing fields
    if (!name || !address) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if email is already registered to another use

    // Fetch user
    const user = await Usermodels.findById(userId);

    // Update user
    const updatedUser = await Usermodels.findByIdAndUpdate(
      userId,
      {
        name: name || user.name,
        email: email || user.email,
        address: address || user.address,
      },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      message: "User profile updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};
export const OrderForAllUser = async (req, res) => {
  try {
    const { status = "Pending", duration } = req.query;
    const userId = req.user._id; // Authenticated user's ID
    const isAdmin = req.user.role === "Admin"; // Assuming 'role' is stored in user data

    let filter = {};

    // If not admin, only fetch orders for the logged-in user
    if (!isAdmin) {
      filter.user = userId;
    }

    if (status) {
      filter.paymentStatus = status;
    }

    if (duration) {
      const now = new Date();
      let startDate;

      switch (duration) {
        case "this week":
          startDate = new Date(now.setDate(now.getDate() - 7));
          break;
        case "this month":
          startDate = new Date(now.setMonth(now.getMonth() - 1));
          break;
        case "last 3 months":
          startDate = new Date(now.setMonth(now.getMonth() - 3));
          break;
        case "last 6 months":
          startDate = new Date(now.setMonth(now.getMonth() - 6));
          break;
        case "this year":
          startDate = new Date(now.setFullYear(now.getFullYear() - 1));
          break;
        default:
          startDate = null;
      }

      if (startDate) {
        filter.createdAt = { $gte: startDate };
      }
    }

    const orders = await Payment.find(filter)
      .populate({
        path: "items.product",
        select:
          "name MainImage thubnailimage1 thubnailimage2 thubnailimage3 thubnailimage4 thubnailimage5",
      })
      .populate("user", "name email"); // Show ordered user's name and email

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

export const UpdateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    console.log("Updating order:", orderId, "to status:", status);

    if (!orderId || !status) {
      return res.status(400).json({
        success: false,
        message: "Order ID and status are required",
      });
    }

    const updatedOrder = await Payment.findByIdAndUpdate(
      orderId,
      { paymentStatus: status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    console.log("Order updated successfully:", updatedOrder);

    res.json({
      success: true,
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order status:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
