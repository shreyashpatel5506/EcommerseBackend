import Usermodels from "../models/Usermodels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = "your_jwt_secret_key"; // Replace with your actual secret key

export const registerController = async (req, res) => {
  try {
    const { name, email, password, address, role, phone } = req.body;

    // Check for missing fields
    if (!name || !email || !password || !address || !role || !phone) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if the email is already registered
    const existingUser = await Usermodels.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email is already registered. Please login.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await Usermodels.create({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      role,
    });

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Respond with success
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
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

export const loginContoller = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validaton
    const user = await Usermodels.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid email or password" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid email or password" });
    }

    const data = { user: { id: user.id } };
    const jwtToken = jwt.sign(data, JWT_SECRET);

    res.json({ success: true, jwtToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ sucess: false, error: "Error in login" });
  }
};
