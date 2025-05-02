const {
  bulkAddOrUpdateVgmToDb,
  getVgmByPlotId,
  deleteVgmFromDb,
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

async function getVgmByPlot(req, res) {
  try {
    const plotId = req.params.plotId;
    if (!plotId) {
      return res.status(400).json({ message: "Plot ID is required" });
    }

    const vgm = await getVgmByPlotId(plotId);
    res.status(200).json(vgm);
  } catch (error) {
    console.error("[VGM ERROR]", error);
    res.status(500).json({ message: error.message });
  }
}

async function deleteVgm(req, res) {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ message: "VGM ID is required" });
    }

    await deleteVgmFromDb(id);

    res.status(200).json({
      message: "VGM deleted successfully",
    });
  } catch (error) {
    console.error("[VGM ERROR]", error);
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  bulkAddOrUpdateVgm,
  getVgmByPlot,
  deleteVgm,
};
