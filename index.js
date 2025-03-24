import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import connectToMongo from "./config/db.js";
import authRoutes from "./routes/auth.js"; 
import CreateCategoryRoute from "./routes/CreateCategoryRoute.js"; // Fixed typo in import statement
import ProductRoute from "./routes/ProductRoute.js";
import contactRoutes from "./routes/ContactRoute.js";
import cors from "cors";

const app = express();

//for extend limit for payload
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
// Connect to MongoDB
connectToMongo();

// dotenv configuration
dotenv.config();

app.use(express.json());
app.use(morgan("dev"));

const allowedOrigins = ["https://ecommersebackend-1.onrender.com", "http://localhost:3000"];
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/category", CreateCategoryRoute); // Fixed typo in route
app.use("/api/product", ProductRoute);
app.use("/api/contact", contactRoutes);

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
