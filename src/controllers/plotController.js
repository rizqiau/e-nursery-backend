const { addPlotToDb } = require("../services/plotServices");

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

module.exports = {
  addPlot,
};
