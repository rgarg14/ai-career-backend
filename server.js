import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";  // import your auth routes

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Root route (optional)
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Mount auth routes under /api/auth
// Now /signup becomes /api/auth/signup, /login becomes /api/auth/login
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

import mongoose from "mongoose";  // add this at top

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
