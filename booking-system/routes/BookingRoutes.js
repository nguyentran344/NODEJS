const express = require("express");
const router = express.Router();
const BookingController = require("../controllers/BookingController");

router.get("/", BookingController.listBookings);
router.get("/create", BookingController.showCreateForm);
router.post("/", BookingController.createBooking);
router.get("/:id/edit", BookingController.showEditForm);
router.put("/:id", BookingController.updateBooking);
router.delete("/:id", BookingController.cancelBooking);

module.exports = router;
