const {
  bulkAddOrUpdateBarisToDb,
  getAllBarisFromDb,
  getBarisByPlotId,
  deleteBarisFromDb,
} = require("../services/barisServices");

async function bulkAddOrUpdateBaris(req, res) {
  try {
    const barisList = req.body;

    if (!Array.isArray(barisList) || barisList.length === 0) {
      return res.status(400).json({
        message: "Data baris harus berupa array dan tidak boleh kosong.",
      });
    }

    const insertedBaris = await bulkAddOrUpdateBarisToDb(barisList);

    res.status(201).json({
      message: "Bulk insert baris berhasil",
      data: insertedBaris,
    });
  } catch (error) {
    console.error("[BARIS ERROR]", error);
    res.status(500).json({ message: error.message });
  }
}

async function getAllBaris(req, res) {
  try {
    const baris = await getAllBarisFromDb();
    res.status(200).json(baris);
  } catch (error) {
    console.error("[BARIS ERROR]", error);
    res.status(500).json({ message: error.message });
  }
}

async function getBarisByPlot(req, res) {
  try {
    const plotId = req.params.plotId;
    if (!plotId) {
      return res.status(400).json({ message: "Plot ID is required" });
    }

    const baris = await getBarisByPlotId(plotId);
    res.status(200).json(baris);
  } catch (error) {
    console.error("[BARIS ERROR]", error);
    res.status(500).json({ message: error.message });
  }
}

async function deleteBaris(req, res) {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ message: "Baris ID is required" });
    }

    await deleteBarisFromDb(id);

    res.status(200).json({
      message: "Baris deleted successfully",
    });
  } catch (error) {
    console.error("[BARIS ERROR]", error);
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  bulkAddOrUpdateBaris,
  getAllBaris,
  getBarisByPlot,
  deleteBaris,
};
