const path = require("path");
const express = require("express");
const connectDB = require(path.join(__dirname, ".", "config", "database"));
const authRoutes = require(path.join(__dirname, ".", "routes", "authRoutes"));
const serviceRoutes = require(path.join(
  __dirname,
  ".",
  "routes",
  "serviceRoutes"
));
const reservationRoutes = require(path.join(
  __dirname,
  ".",
  "routes",
  "reservationRoutes"
));

const app = express();
const PORT = process.env.PORT || 3000;

// Kết nối database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/services", serviceRoutes);
app.use("/reservations", reservationRoutes);

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server đang chạy trên port ${PORT}`);
});
