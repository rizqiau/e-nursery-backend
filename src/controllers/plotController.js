const {
  addPlotToDb,
  bulkAddPlotsToDb,
  getAllPlotsFromDb,
  updatePlotInDb,
  bulkUpdatePlotsToDb,
  deletePlotFromDb,
} = require("../services/plotServices");

async function addPlot(req, res) {
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
    const plot = await addPlotToDb({
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

async function bulkAddPlots(req, res) {
  try {
    const plots = req.body;

    if (!Array.isArray(plots)) {
      return res.status(400).json({ message: "Data harus berupa array" });
    }

    // Pisahkan data baru dan update
    const newPlots = plots.filter((p) => !p.id_plot);
    const existingPlots = plots.filter((p) => p.id_plot);

    // Proses data baru
    const inserted = await bulkAddPlotsToDb(newPlots);

    // Proses update
    const updated = await bulkUpdatePlotsToDb(existingPlots);

    res.status(201).json({
      message: "Bulk upsert berhasil",
      data: [...inserted, ...updated],
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

async function updatePlot(req, res) {
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

    // Update plot di database
    const plot = await updatePlotInDb({
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

    res.status(200).json({
      message: "Plot updated successfully",
      data: plot,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function bulkUpdatePlots(req, res) {
  try {
    const plots = req.body;
    if (!Array.isArray(plots) || plots.length === 0) {
      return res.status(400).json({ message: "Data plot harus berupa array" });
    }

    const updatedPlots = await bulkUpdatePlotsToDb(plots);

    // PASTIKAN ini selalu dijalankan untuk selesaikan request!
    return res.status(200).json({
      message: "Bulk update berhasil",
      data: updatedPlots,
    });
  } catch (error) {
    // PASTIKAN error juga di-handle dengan proper response
    return res.status(500).json({ message: error.message });
  }
}

async function deletePlot(req, res) {
  try {
    const id_plot = req.params.id;

    // Hard delete dari Supabase
    const { error } = await supabase
      .from("plot")
      .delete()
      .eq("id_plot", id_plot);

    if (error) throw error;

    res.status(200).json({
      message: "Plot berhasil dihapus",
      data: { id_plot },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Update module.exports
module.exports = {
  addPlot,
  bulkAddPlots,
  getAllPlots,
  updatePlot,
  bulkUpdatePlots,
  deletePlot,
};
