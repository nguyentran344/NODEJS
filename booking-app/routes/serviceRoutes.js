const path = require("path");
const express = require("express");
const { listServices } = require(path.join(
  __dirname,
  "..",
  "controllers",
  "serviceController"
));
const authMiddleware = require(path.join(
  __dirname,
  "..",
  "middlewares",
  "authMiddleware"
));
const router = express.Router();

router.get("/", authMiddleware, listServices);

module.exports = router;
