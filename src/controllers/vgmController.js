const {
  bulkAddOrUpdateVgmToDb,
  getAllVgmFromDb,
  deleteVgmByPlotId,
} = require("../services/vgmServices");

async function bulkAddOrUpdateVgm(req, res) {
  try {
    const vgmList = req.body;

    if (!Array.isArray(vgmList) || vgmList.length === 0) {
      return res.status(400).json({
        message: "Data VGM harus berupa array dan tidak boleh kosong.",
      });
    }

    const insertedVgm = await bulkAddOrUpdateVgmToDb(vgmList);

    res.status(201).json({
      message: "Bulk insert VGM berhasil",
      data: insertedVgm,
    });
  } catch (error) {
    console.error("[VGM ERROR]", error);
    res.status(500).json({ message: error.message });
  }
}

async function getAllVgm(req, res) {
  try {
    const vgm = await getAllVgmFromDb();
    res.status(200).json(vgm);
  } catch (error) {
    console.error("[VGM ERROR]", error);
    res.status(500).json({ message: error.message });
  }
}

async function deleteVgmByPlot(req, res) {
  try {
    const plotId = req.params.plotId;
    if (!plotId) {
      return res.status(400).json({ message: "Plot ID is required" });
    }

    await deleteVgmByPlotId(plotId);

    res.status(200).json({
      message: "All VGM for plot deleted successfully",
    });
  } catch (error) {
    console.error("[VGM ERROR]", error);
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  bulkAddOrUpdateVgm,
  getAllVgm,
  deleteVgmByPlot,
};
