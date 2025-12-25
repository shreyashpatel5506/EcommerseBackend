import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

dotenv.config(); // ✅ ALWAYS ON TOP

import connectToMongo from "./config/db.js";
import authRoutes from "./routes/auth.js";
import CreateCategoryRoute from "./routes/CreateCategoryRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import contactRoutes from "./routes/ContactRoute.js";

const app = express();

/* ===================== MIDDLEWARE ===================== */
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(morgan("dev"));

/* ===================== CORS ===================== */
const allowedOrigins = [
  "https://ecommersebackend-1.onrender.com",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (!allowedOrigins.includes(origin)) {
        return callback(new Error("Not allowed by CORS"));
      }
      callback(null, true);
    },
    credentials: true,
  })
);

/* ===================== DATABASE ===================== */
connectToMongo();

/* ===================== ROUTES ===================== */
app.use("/api/auth", authRoutes);
app.use("/api/category", CreateCategoryRoute);
app.use("/api/product", ProductRoute);
app.use("/api/contact", contactRoutes);

/* ===================== TEST ROUTE ===================== */
app.get("/", (req, res) => {
  res.send("Ecommerce Backend Running 🚀");
});

/* ===================== SERVER ===================== */
const PORT = process.env.PORT || 5020;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
