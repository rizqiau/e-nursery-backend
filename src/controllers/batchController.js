const {
  bulkAddOrUpdateBatchToDb,
  getAllBatchFromDb,
} = require("../services/batchServices");

async function bulkAddOrUpdateBatch(req, res) {
  try {
    const batchList = req.body;

    if (!Array.isArray(batchList) || batchList.length === 0) {
      return res.status(400).json({
        message: "Data Batch harus berupa array dan tidak boleh kosong.",
      });
    }

    const insertedBatch = await bulkAddOrUpdateBatchToDb(batchList);

    res.status(201).json({
      message: "Bulk insert Batch berhasil",
      data: insertedBatch,
    });
  } catch (error) {
    console.error("[VGM ERROR]", error);
    res.status(500).json({ message: error.message });
  }
}

async function getAllBatch(req, res) {
  try {
    const vgm = await getAllBatchFromDb();
    res.status(200).json(vgm);
  } catch (error) {
    console.error("[BATCH ERROR]", error);
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  bulkAddOrUpdateBatch,
  getAllBatch,
};
