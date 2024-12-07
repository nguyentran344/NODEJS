const path = require("path");
const Service = require(path.join(__dirname, "..", "models", "Service"));

exports.listServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi lấy danh sách dịch vụ", error: error.message });
  }
};
