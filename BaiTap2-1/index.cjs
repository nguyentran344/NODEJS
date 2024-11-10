const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");

// Middleware để parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files từ thư mục public
app.use(express.static("public"));

// Route để hiển thị form login
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Route xử lý login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Đọc file user.txt
  fs.readFile("user.txt", "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Lỗi đọc file");
    }

    // Parse data từ file
    const fileData = data.trim();
    const [fileUsername, filePassword] = fileData.split("&").map((item) => {
      return item.split("=")[1];
    });

    // Kiểm tra thông tin đăng nhập
    if (username === fileUsername && password === filePassword) {
      res.send(`
                <h2>Đăng nhập thành công!</h2>
                <p>Thông tin user:</p>
                <ul>
                    <li>Username: ${username}</li>
                    <li>Password: ${password}</li>
                </ul>
            `);
    } else {
      res.send(`
                <h2>Đăng nhập thất bại!</h2>
                <p>Username hoặc password không đúng</p>
                <a href="/">Quay lại trang đăng nhập</a>
            `);
    }
  });
});

// Khởi động server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
