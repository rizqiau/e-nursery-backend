const express = require("express");
const router = express.Router();
const {
  bulkAddOrUpdateBaris,
  getAllBaris,
  deleteBarisByPlot,
} = require("../controllers/barisController");

router.post("/bulk_add_or_update", bulkAddOrUpdateBaris);
router.get("/all", getAllBaris);
router.delete("/deleteByPlot/:plotId", deleteBarisByPlot);

module.exports = router;
