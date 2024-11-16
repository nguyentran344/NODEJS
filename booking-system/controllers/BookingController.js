const Booking = require("./models/Booking");

class BookingController {
  // Hiển thị danh sách đặt chỗ
  static async listBookings(req, res) {
    try {
      const bookings = await Booking.find().sort({ date: 1, time: 1 });
      res.render("bookings/list", { bookings });
    } catch (error) {
      res.status(500).send("Server Error");
    }
  }

  // Xử lý tạo đặt chỗ mới
  static async createBooking(req, res) {
    try {
      const { customerName, date, time } = req.body;

      const booking = new Booking({
        customerName,
        date,
        time,
      });

      await booking.save();

      res.status(201).json({
        success: true,
        message: "Đặt chỗ thành công",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Xử lý cập nhật đặt chỗ
  static async updateBooking(req, res) {
    try {
      const { customerName, date, time } = req.body;

      // Kiểm tra trùng lịch
      const existingBooking = await Booking.findOne({
        date,
        time,
        status: { $ne: "Cancelled" },
        _id: { $ne: req.params.id },
      });

      if (existingBooking) {
        return res.status(400).json({
          success: false,
          message: "Thời gian này đã có người đặt",
        });
      }

      const booking = await Booking.findByIdAndUpdate(
        req.params.id,
        { customerName, date, time },
        { new: true, runValidators: true }
      );

      if (!booking) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy đặt chỗ",
        });
      }

      res.json({
        success: true,
        message: "Cập nhật thành công",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Xử lý hủy đặt chỗ
  static async cancelBooking(req, res) {
    try {
      const booking = await Booking.findByIdAndUpdate(
        req.params.id,
        { status: "Cancelled" },
        { new: true }
      );

      if (!booking) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy đặt chỗ",
        });
      }

      res.json({
        success: true,
        message: "Hủy đặt chỗ thành công",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Lỗi server",
      });
    }
  }
}

module.exports = BookingController;
