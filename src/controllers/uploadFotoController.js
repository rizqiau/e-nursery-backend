const uploadFotoServices = require("../services/uploadFotoServices");

exports.uploadFotoVgm = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "Tidak ada file yang diupload" });
    }
    const url = await uploadFotoServices.uploadFotoToSupabase(file);
    res.json({ url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
