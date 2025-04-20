const express = require("express");
const router = express.Router();
const { addPlot } = require("../controllers/plotController");

// Endpoint to add a new plot
router.post("/add", addPlot);

module.exports = router;
