const express = require("express");
const router = express.Router();
const {
  bulkAddOrUpdateVgm,
  getVgmByPlot,
  getAllVgm,
  deleteVgm,
} = require("../controllers/vgmController");

router.post("/bulk_add_or_update", bulkAddOrUpdateVgm);
router.get("/plot/:plotId", getVgmByPlot);
router.get("/all", getAllVgm);
router.delete("/delete/:id", deleteVgm);

module.exports = router;
