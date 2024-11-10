const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const app = express();

app.use(express.static("public"));

// API để lấy danh sách tỉnh thành
app.get("/api/cities", async (req, res) => {
  try {
    const data = await fs.readFile("vietnameseVehiclePlates.txt", "utf8");
    const vehicleData = JSON.parse(data);
    const cities = vehicleData.map((item) => item.city);
    res.json(cities);
  } catch (error) {
    res.status(500).json({ error: "Không thể đọc dữ liệu tỉnh thành" });
  }
});

// API để lấy biển số xe theo tỉnh thành
app.get("/api/plates/:city", async (req, res) => {
  try {
    const data = await fs.readFile("vietnameseVehiclePlates.txt", "utf8");
    const vehicleData = JSON.parse(data);
    const cityInfo = vehicleData.find(
      (item) => item.city === decodeURIComponent(req.params.city)
    );
    res.json(cityInfo || { error: "Không tìm thấy thông tin" });
  } catch (error) {
    res.status(500).json({ error: "Không thể tìm thấy dữ liệu biển số xe" });
  }
});

app.listen(3000, () => {
  console.log("Server đang chạy tại http://localhost:3000");
});
