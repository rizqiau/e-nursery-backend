const express = require("express");
const router = express.Router();
const {
  bulkAddOrUpdateBatch,
  getAllBatch,
} = require("../controllers/batchController");

router.post("/bulk_add_or_update", bulkAddOrUpdateBatch);
router.get("/all", getAllBatch);

module.exports = router;
