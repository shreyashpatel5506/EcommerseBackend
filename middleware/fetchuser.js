import JWT from "jsonwebtoken";
import Usermodels from "../models/Usermodels.js";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

// Middleware to fetch user from the token
export const fetchuser = async (req, res, next) => {
  try {
    // Log all headers for debugging
    console.log("Headers:", req.headers);

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.error("Authorization header missing");
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    console.log("Authorization Header:", authHeader);

    // Check if the header starts with 'Bearer'
    if (!authHeader.startsWith("Bearer ")) {
      console.error("Authorization header does not start with 'Bearer'");
      return res
        .status(401)
        .json({ success: false, message: "Invalid token format" });
    }

    // Extract token
    const token = authHeader.split(" ")[1];
    console.log("Extracted Token:", token);

    // Verify the token
    const decoded = JWT.verify(token, JWT_SECRET);
    console.log("Decoded Token:", decoded);

    // Find user in database
    const user = await Usermodels.findById(decoded.id);
    if (!user) {
      console.error("User not found for decoded token");
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error verifying token:", error.message);
    res
      .status(401)
      .json({ success: false, message: "Unauthorized: Invalid token" });
  }
};

// Middleware to verify if the user is an admin
export const isAdmin = async (req, res, next) => {
  try {
    const user = await Usermodels.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Admin access required",
      });
    }

    next();
  } catch (error) {
    console.error("Admin Check Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
