const express = require("express");
const router = express.Router();
const {
  addOrUpdatePlot,
  bulkAddOrUpdatePlots,
  getAllPlots,
  deletePlot,
} = require("../controllers/plotController");

// Endpoint to add a new plot
router.post("/add_or_update", addOrUpdatePlot);
router.post("/bulk_add_or_update", bulkAddOrUpdatePlots);
router.get("/all", getAllPlots);
router.delete("/delete/:id", deletePlot);

module.exports = router;
