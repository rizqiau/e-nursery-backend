const express = require("express");
const router = express.Router();
const multer = require("multer");
const uploadController = require("../controllers/uploadController");
const upload = multer();

router.post("/upload", upload.single("file"), uploadController.uploadImage);

module.exports = router;
