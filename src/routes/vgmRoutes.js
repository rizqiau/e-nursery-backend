const express = require("express");
const router = express.Router();
const {
  bulkAddOrUpdateVgm,
  getAllVgm,
  deleteVgmByPlot,
} = require("../controllers/vgmController");

router.post("/bulk_add_or_update", bulkAddOrUpdateVgm);
router.get("/all", getAllVgm);
router.delete("/deleteByPlot/:plotId", deleteVgmByPlot);

module.exports = router;
