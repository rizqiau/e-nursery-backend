const express = require("express");
const router = express.Router();
const {
  bulkAddVgm,
  getVgmByPlot,
  updateVgm,
  deleteVgm,
} = require("../controllers/vgmController");

router.post("/bulk_add", bulkAddVgm);
router.get("/plot/:plotId", getVgmByPlot);
router.put("/update", updateVgm);
router.delete("/delete/:id", deleteVgm);

module.exports = router;
