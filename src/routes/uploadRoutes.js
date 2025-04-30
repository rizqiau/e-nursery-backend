const express = require("express");
const router = express.Router();
const multer = require("multer");
const supabase = require("../config/supabaseClient");
const upload = multer();

// Endpoint untuk upload gambar
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "Tidak ada file yang diupload" });
    }

    // Generate nama file unik
    const fileName = `profile_${Date.now()}_${file.originalname}`;

    // Upload ke Supabase Storage
    const { error } = await supabase.storage
      .from("user-profile") // Nama bucket di Supabase
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        cacheControl: "3600",
        upsert: false,
      });

    if (error) throw error;

    // Dapatkan URL public
    const { data } = supabase.storage
      .from("user-profile")
      .getPublicUrl(fileName);

    res.json({ url: data.publicUrl });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
