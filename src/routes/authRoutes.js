const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

// Endpoint register
router.post("/register", register);

// Endpoint login
router.post("/login", login);

module.exports = router;
