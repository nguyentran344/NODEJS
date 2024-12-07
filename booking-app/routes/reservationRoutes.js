const express = require("express");
const path = require("path");
const {
  createReservation,
  listReservations,
  deleteReservation,
} = require(path.join(__dirname, "..", "controllers", "ReservationController"));
const authMiddleware = require(path.join(
  __dirname,
  "..",
  "middlewares",
  "authMiddleware"
));
const router = express.Router();

router.post("/", authMiddleware, createReservation);
router.get("/", authMiddleware, listReservations);
router.delete("/:id", authMiddleware, deleteReservation);

module.exports = router;
