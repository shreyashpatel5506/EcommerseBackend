import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import connectToMongo from "./config/db.js";
import authRoutes from "./routes/auth.js";
import CreateCategoryRoute from "./routes/CreateCategoryRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import contactRoutes from "./routes/ContactRoute.js";

/* ===================== ENV ===================== */
dotenv.config();

/* ===================== APP ===================== */
const app = express();

/* ===================== PATH SETUP ===================== */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ===================== MIDDLEWARE ===================== */
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(morgan("dev"));

/* ===================== CORS ===================== */
app.use(
  cors({
    origin: true, // allow same-domain frontend
    credentials: true,
  })
);

/* ===================== DATABASE ===================== */
connectToMongo();

/* ===================== API ROUTES ===================== */
app.use("/api/auth", authRoutes);
app.use("/api/category", CreateCategoryRoute);
app.use("/api/product", ProductRoute);
app.use("/api/contact", contactRoutes);

/* ===================== FRONTEND (REACT BUILD) ===================== */
// ⚠️ React folder name = client
const clientBuildPath = path.join(__dirname, "../client/build");

app.use(express.static(clientBuildPath));

// React routing support
app.get("*", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

/* ===================== SERVER ===================== */
const PORT = process.env.PORT || 5020;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
