const express = require("express");
const router = express.Router();
const {
  bulkAddOrUpdateBaris,
  getAllBaris,
  getBarisByPlot,
  deleteBaris,
} = require("../controllers/barisController");

router.post("/bulk_add", bulkAddOrUpdateBaris);
router.get("/all", getAllBaris);
router.get("/plot/:plotId", getBarisByPlot);
router.delete("/delete/:id", deleteBaris);

module.exports = router;
