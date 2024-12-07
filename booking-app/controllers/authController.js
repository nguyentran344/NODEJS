const path = require("path");
const User = require(path.join(__dirname, "..", "models", "User"));
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Kiểm tra username đã tồn tại chưa
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username đã tồn tại" });
    }

    // Tạo user mới
    const user = new User({ username, password });
    await user.save();

    res.status(201).json({ message: "Đăng ký thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi đăng ký", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Tìm user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Đăng nhập thất bại" });
    }

    // Kiểm tra mật khẩu
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Đăng nhập thất bại" });
    }

    // Tạo token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Lỗi đăng nhập", error: error.message });
  }
};
