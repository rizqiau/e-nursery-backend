const {
  addOrUpdatePlotToDb,
  bulkAddOrUpdatePlotsToDb,
  getAllPlotsFromDb,
  deletePlotFromDb,
} = require("../services/plotServices");

async function addOrUpdatePlot(req, res) {
  try {
    const {
      id_plot,
      nama_plot,
      luas_area,
      tanggal_tanam,
      tanggal_transplanting,
      varietas,
      latitude,
      longitude,
      jumlah_bibit,
    } = req.body;

    // Validate input
    if (
      !id_plot ||
      !nama_plot ||
      !luas_area ||
      !tanggal_tanam ||
      !latitude ||
      !longitude
    ) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    // Add plot to the database
    const plot = await addOrUpdatePlotToDb({
      id_plot,
      nama_plot,
      luas_area,
      tanggal_tanam,
      tanggal_transplanting,
      varietas,
      latitude,
      longitude,
      jumlah_bibit,
    });

    res.status(201).json({
      message: "Plot added successfully",
      data: plot,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function bulkAddOrUpdatePlots(req, res) {
  try {
    const plots = req.body; // Expect array of plots

    if (!Array.isArray(plots) || plots.length === 0) {
      return res.status(400).json({
        message: "Data plot harus berupa array dan tidak boleh kosong.",
      });
    }

    // Add plots to the database
    const insertedPlots = await bulkAddOrUpdatePlotsToDb(plots);

    res.status(201).json({
      message: "Bulk insert plot berhasil",
      data: insertedPlots,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getAllPlots(req, res) {
  try {
    const plots = await getAllPlotsFromDb();
    res.status(200).json(plots); // <-- kirim langsung array
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deletePlot(req, res) {
  try {
    const id_plot = req.params.id;

    if (!id_plot) {
      return res.status(400).json({ message: "Plot ID is required" });
    }

    // Delete plot dari database
    await deletePlotFromDb(id_plot);

    res.status(200).json({
      message: "Plot deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Update module.exports
module.exports = {
  addOrUpdatePlot,
  bulkAddOrUpdatePlots,
  getAllPlots,
  deletePlot,
};
