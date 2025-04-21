const express = require("express");
const router = express.Router();
const {
  addPlot,
  bulkAddPlots,
  getAllPlots,
} = require("../controllers/plotController");

// Endpoint to add a new plot
router.post("/add", addPlot);

router.post("/bulk_add", bulkAddPlots);

router.get("/all", getAllPlots);

module.exports = router;
