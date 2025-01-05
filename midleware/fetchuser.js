import JWT from "jsonwebtoken";
import Usermodels from "../models/Usermodels.js";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key"; // Use environment variables for sensitive data

// Middleware to fetch user from the token
export const fetchuser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Access denied: No token provided" });
    }

    const decoded = JWT.verify(token, JWT_SECRET);
    req.user = decoded; // Attach decoded token data to request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error verifying token:", error.message);
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: Invalid token" });
  }
};

// Middleware to check admin access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await Usermodels.findById(req.user._id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Forbidden: Admin access required" });
    }

    next(); // User is admin, proceed to the next middleware or route handler
  } catch (error) {
    console.error("Admin Check Error:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Middleware to fetch all data based on token
export const fetchalldata = async (req, res, next) => {
  const token = req.headers["jwtdata"]; // Extract token from custom header

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access denied: No token provided" });
  }

  try {
    const decoded = JWT.verify(token, JWT_SECRET);
    const user = await Usermodels.findById(decoded.id).select("-password"); // Exclude password

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    req.user = decoded; // Attach decoded token data to request
    req.rootUser = user; // Attach user data to request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error verifying token:", error.message);
    res
      .status(401)
      .json({ success: false, message: "Unauthorized: Invalid token" });
  }
};
