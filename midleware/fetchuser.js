import JWT from "jsonwebtoken";
import Usermodels from "../models/Usermodels.js";
// fetchuser.js

const JWT_SECRET = "your_jwt_secret_key";
export const fetchuser = async (req, res, next) => {
  try {
    // Assume user is fetched from database, e.g. using Mongoose
    const decode = JWT.verify(req.headers.authorization, JWT_SECRET);

    // If user is not found, send response early and return to prevent further code execution
    req.user = decode;
    // if (!user) {
    //   return res.status(404).json({ error: "User not found" });
    // }
    // Attach user to request object for use in other middlewares or routes

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      // Check if headers are already sent to avoid multiple responses
      return res.status(500).json({ error: "Internal Server Error" });
    }
    next(error); // If headers are already sent, pass error to the error handling middleware
  }
};

//admin acess
export const isAdmin = async (req, res, next) => {
  try {
    const user = await Usermodels.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access",
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

export const fetchalldata = async (req, res, next) => {
  const token = req.header("jwtdata"); // Extract token from header

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access: No token provided",
    });
  }

  try {
    // Verify the token
    const decoded = JWT.verify(token, JWT_SECRET);

    // Retrieve user data from the database
    const user = await Usermodels.findById(decoded.id).select("-password"); // Exclude password

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    req.user = decoded; // Attach decoded token data to req
    req.rootUser = user; // Attach user data to req
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error verifying token:", error.message);
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized access: Invalid token" });
  }
};
