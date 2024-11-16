const express = require("express");
const connectDB = require("./config/database");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

const app = express();

// Kết nối database
connectDB();

// Middleware
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use("/bookings", require("./routes/BookingRoutes"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
