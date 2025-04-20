const express = require("express");
const cors = require("cors");
const authRoutes = require("./src/routes/authRoutes");
const plotRoutes = require("./src/routes/plotRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/plot", plotRoutes);

// Root route (optional buat cek server nyala)
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
