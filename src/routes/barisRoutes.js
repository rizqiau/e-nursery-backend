const express = require("express");
const router = express.Router();
const {
  bulkAddBaris,
  getAllBaris,
  getBarisByPlot,
  bulkUpdateBaris,
  deleteBaris,
} = require("../controllers/barisController");

router.post("/bulk_add", bulkAddBaris);
router.get("/all", getAllBaris);
router.get("/plot/:plotId", getBarisByPlot);
router.put("/bulk_update", bulkUpdateBaris);
router.delete("/delete/:id", deleteBaris);

module.exports = router;
