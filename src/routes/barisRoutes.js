const express = require("express");
const router = express.Router();
const {
  bulkAddOrUpdateBaris,
  getAllBaris,
  deleteBarisByPlot,
  deleteBaris,
} = require("../controllers/barisController");

router.post("/bulk_add_or_update", bulkAddOrUpdateBaris);
router.get("/all", getAllBaris);
router.delete("/deleteByPlot/:plotId", deleteBarisByPlot);
router.delete("/delete/:id", deleteBaris);

module.exports = router;
