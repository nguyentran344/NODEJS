const path = require("path");
const express = require("express");

const { register, login } = require(path.join(
  __dirname,
  "..",
  "controllers",
  "authController"
));
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;
