const express = require("express");
const router = express.Router();
const {
  bulkAddOrUpdateVgm,
  getAllVgm,
} = require("../controllers/vgmController");

router.post("/bulk_add_or_update", bulkAddOrUpdateVgm);
router.get("/all", getAllVgm);

module.exports = router;
