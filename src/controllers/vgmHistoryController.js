const {
  bulkAddOrUpdateVgmHistoryToDb,
  getAllVgmHistoryFromDb,
} = require("./services/vgmHistoryServices");

async function bulkAddOrUpdateVgmHistory(req, res) {
  try {
    const vgmHistoryList = req.body;

    if (!Array.isArray(vgmHistoryList) || vgmHistoryList.length === 0) {
      return res.status(400).json({
        message: "Data VGM History harus berupa array dan tidak boleh kosong.",
      });
    }

    const insertedVgmHistory = await bulkAddOrUpdateVgmHistoryToDb(
      vgmHistoryList
    );

    res.status(201).json({
      message: "Bulk insert VGM History berhasil",
      data: insertedVgmHistory,
    });
  } catch (error) {
    console.error("[VGM ERROR]", error);
    res.status(500).json({ message: error.message });
  }
}

async function getAllVgmHistory(req, res) {
  try {
    const vgm = await getAllVgmHistoryFromDb();
    res.status(200).json(vgm);
  } catch (error) {
    console.error("[VGM ERROR]", error);
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  bulkAddOrUpdateVgmHistory,
  getAllVgmHistory,
};
