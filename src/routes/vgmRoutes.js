const express = require("express");
const router = express.Router();
const {
  bulkAddOrUpdateVgm,
  getAllVgm,
  deleteVgmByPlot,
  deleteVgm,
} = require("../controllers/vgmController");

router.post("/bulk_add_or_update", bulkAddOrUpdateVgm);
router.get("/all", getAllVgm);
router.delete("/deleteByPlot/:plotId", deleteVgmByPlot);
router.delete("/delete/:id", deleteVgm);

module.exports = router;
