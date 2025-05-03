const express = require("express");
const cors = require("cors");
const authRoutes = require("./src/routes/authRoutes");
const plotRoutes = require("./src/routes/plotRoutes");
const uploadRoutes = require("./src/routes/uploadRoutes");
const barisRoutes = require("./src/routes/barisRoutes");
const vgmRoutes = require("./src/routes/vgmRoutes");
const vgmHistoryRoutes = require("./src/routes/vgmHistoryRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/plot", plotRoutes);
app.use("/api", uploadRoutes);
app.use("/api/baris", barisRoutes);
app.use("/api/vgm", vgmRoutes);
app.use("/api/vgm_history", vgmHistoryRoutes);

// Root route (optional buat cek server nyala)
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
