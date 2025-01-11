import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectToMongo from "./config/db.js"; // Updated the import statement
import authRoutes from "./routes/auth.js"; // Added .js to the path
import CreateCtegoryRoute from "./routes/CreateCategoryRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import cors from "cors";

const app = express();

// Connect to MongoDB
connectToMongo();

// dotenv configuration
dotenv.config();

app.use(express.json());
app.use(morgan("dev"));

app.use(cors({ origin: "http://localhost:3000" }));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/category", CreateCtegoryRoute);
app.use("/api/product", ProductRoute);

// endpoint in web rest API
app.get("/", (req, res) => {
  res.send("Hello World");
});

// ports initialize
const port = 5020;

// port response listen
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
