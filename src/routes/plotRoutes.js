const express = require("express");
const router = express.Router();
const { addPlot } = require("../controllers/plotController");
const { bulkAddPlots } = require("../controllers/plotController");

// Endpoint to add a new plot
router.post("/add", addPlot);

router.post("/bulk_add", bulkAddPlots);

module.exports = router;
