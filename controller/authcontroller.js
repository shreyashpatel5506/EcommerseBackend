import Usermodels from "../models/Usermodels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Use environment variables for sensitive data
const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

// Register Controller
export const registerController = async (req, res) => {
  try {
    const { name, email, password, address, role, phone, answer } = req.body;

    // Validation for missing fields
    if (
      !name ||
      !email ||
      !password ||
      !address ||
      !role ||
      !phone ||
      !answer
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if email is already registered
    const existingUser = await Usermodels.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email is already registered. Please login.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await Usermodels.create({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      role,
      answer,
    });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Login Controller
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
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    return res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Error in login. Please try again." });
  }
};

// Forgot Password Controller
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    if (!email || !answer || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Email, security answer, and new password are required.",
      });
    }

    const user = await Usermodels.findOne({ email, answer });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Incorrect email or security answer.",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await Usermodels.findByIdAndUpdate(user._id, { password: hashedPassword });

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred. Please try again.",
    });
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
