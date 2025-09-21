const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config");

// Import routes
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const inventoryRoutes = require("./routes/inventory");

const app = express();

// --- EDITED SECTION START ---

// Define the list of allowed origins.
// I have removed the trailing slash from the Vercel URL to ensure it matches what the browser sends.
const allowedOrigins = [
  "https://meesho-clone-liwx.vercel.app",
  "http://localhost:3000",
];

// If you have a CORS_ORIGIN environment variable set on Render, add it to the list.
if (process.env.CORS_ORIGIN) {
  allowedOrigins.push(process.env.CORS_ORIGIN);
}

// Simplified and more reliable CORS options.
// This directly tells the 'cors' package which origins are allowed.
const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

// --- EDITED SECTION END ---

// Middleware
app.use(cors(corsOptions)); // Use the corrected options
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/inventory", inventoryRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ message: "Server is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  // Don't leak error details in production
  const isDevelopment = process.env.NODE_ENV === "development";

  res.status(500).json({
    error: "Something went wrong!",
    ...(isDevelopment && { details: err.message, stack: err.stack }),
  });
});

// Handle 404 routes
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = config.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
