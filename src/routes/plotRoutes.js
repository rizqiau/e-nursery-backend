const express = require("express");
const router = express.Router();
const {
  addPlot,
  bulkAddPlots,
  getAllPlots,
  updatePlot,
  bulkUpdatePlots,
  deletePlot,
} = require("../controllers/plotController");

// Endpoint to add a new plot
router.post("/add", addPlot);
router.post("/bulk_add", bulkAddPlots);
router.get("/all", getAllPlots);
router.put("/update", updatePlot);
router.put("/bulk_update", bulkUpdatePlots);
router.delete("/delete/:id", deletePlot);

module.exports = router;
