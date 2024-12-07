const path = require("path");
const Reservation = require(path.join(
  __dirname,
  "..",
  "models",
  "Reservation"
));

exports.createReservation = async (req, res) => {
  try {
    const { service_id, date, time, number_of_people } = req.body;

    const reservation = new Reservation({
      user_id: req.user.id,
      service_id,
      date,
      time,
      number_of_people,
    });

    await reservation.save();
    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ message: "Lỗi tạo đặt chỗ", error: error.message });
  }
};

exports.listReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({
      user_id: req.user.id,
    }).populate("service_id", "name description");
    res.json(reservations);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi lấy danh sách đặt chỗ", error: error.message });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findOneAndDelete({
      _id: req.params.id,
      user_id: req.user.id,
    });

    if (!reservation) {
      return res.status(404).json({ message: "Không tìm thấy đặt chỗ" });
    }

    res.json({ message: "Xóa đặt chỗ thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi xóa đặt chỗ", error: error.message });
  }
};
