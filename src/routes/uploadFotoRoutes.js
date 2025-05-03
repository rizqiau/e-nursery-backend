const express = require("express");
const router = express.Router();
const multer = require("multer");
const uploadFotoController = require("../controllers/uploadFotoController");
const upload = multer();

router.post(
  "/upload_foto",
  upload.single("file"),
  uploadFotoController.uploadFotoVgm
);

module.exports = router;
