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
      return res.status(400).json({
        status: "error",
        message: "Data harus berupa array",
      });
    }

    // Validasi struktur data
    const isValid = plots.every((plot) => {
      return plot.id_plot && plot.nama_plot && plot.luas_area;
    });

    if (!isValid) {
      return res.status(400).json({
        status: "error",
        message: "Data plot tidak lengkap",
      });
    }

    const result = await bulkAddPlotsToDb(plots);

    res.status(201).json({
      status: "success",
      data: result,
      message: `Berhasil sinkronisasi ${result.length} plot`,
    });
  } catch (error) {
    console.error("[BULK ADD ERROR]", error);
    res.status(500).json({
      status: "error",
      message: error.message || "Terjadi kesalahan server",
    });
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
