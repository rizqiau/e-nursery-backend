const express = require("express");
const router = express.Router();
const {
  bulkAddOrUpdateBaris,
  getAllBaris,
} = require("../controllers/barisController");

router.post("/bulk_add_or_update", bulkAddOrUpdateBaris);
router.get("/all", getAllBaris);

module.exports = router;
