const express = require("express");
const router = express.Router();
const {
  bulkAddOrUpdateVgmHistory,
  getAllVgmHistory,
} = require("../controllers/vgmHistoryController");

router.post("/bulk_add_or_update", bulkAddOrUpdateVgmHistory);
router.get("/all", getAllVgmHistory);

module.exports = router;
