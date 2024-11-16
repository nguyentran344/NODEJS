const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, "Tên khách hàng là bắt buộc"],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, "Ngày đặt chỗ là bắt buộc"],
    },
    time: {
      type: String,
      required: [true, "Giờ đặt chỗ là bắt buộc"],
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending",
    },
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
  }
);

// Thêm các phương thức tĩnh
bookingSchema.statics.checkOverlap = async function (
  date,
  time,
  excludeId = null
) {
  const query = {
    date: new Date(date),
    time: time,
    status: { $ne: "Cancelled" },
  };

  if (excludeId) {
    query._id = { $ne: excludeId };
  }

  const overlappingBooking = await this.findOne(query);
  return overlappingBooking;
};

// Thêm các phương thức instance
bookingSchema.methods.cancel = async function () {
  this.status = "Cancelled";
  return await this.save();
};

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
