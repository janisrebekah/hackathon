import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorHandler.js";
import session from "express-session";
import passport from "passport";
import "./config/passport.js";

// Route imports
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import swapRoutes from "./routes/swapRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to DB
connectDB();

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// Sessions (before passport)
app.use(session({
  secret: process.env.SESSION_SECRET || "yourSecretKey",
  resave: false,
  saveUninitialized: false,
}));



// Routes
app.use("/auth", authRoutes);               // << ✅ mount here
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/swaps", swapRoutes);



app.use(cors({
  origin: "http://localhost:3000", // your frontend
  credentials: true // allows cookie sharing
}));

// Root route
app.get("/", (req, res) => {
  res.send("🔁 Skill Swap Platform Backend is running!");
});

// Error handling
app.use(errorHandler);

app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 86400000 // 1 day
  }
}));

app.use(passport.initialize());
app.use(passport.session());


// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});




