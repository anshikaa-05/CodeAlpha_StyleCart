const express = require("express");
const router = express.Router();

const { createOrder } = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");

// Place order
router.post("/", authMiddleware, createOrder);

module.exports = router;