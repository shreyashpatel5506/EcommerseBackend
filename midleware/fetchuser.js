import JWT from "jsonwebtoken";
import Usermodels from "../models/Usermodels.js";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

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
    console.log("Decoded Token:", req.user); // Debugging decoded token
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error verifying token:", error.message);
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: Invalid token" });
  }
};

// Middleware to verify if the user is an admin
export const isAdmin = async (req, res, next) => {
  try {
    // Fetch user from the database using the `_id` in `req.user`
    const user = await Usermodels.findById(req.user._id);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if the user role is Admin
    if (user.role !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Admin access required",
      });
    }

    // User is admin, proceed to the next middleware or route handler
    req.user.role = user.role;
    next();
  } catch (error) {
    console.error("Admin Check Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
