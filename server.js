import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";  // import your auth routes
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// --- Health check route (place it here) ---
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Root route (optional)
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Mount auth routes under /api/auth
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Start server
app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));


