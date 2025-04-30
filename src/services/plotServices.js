const supabase = require("../config/supabaseClient");

async function addPlotToDb({
  id_plot,
  nama_plot,
  luas_area,
  tanggal_tanam,
  tanggal_transplanting,
  varietas,
  latitude,
  longitude,
  jumlah_bibit,
}) {
  try {
    // Insert data into the plot table in Supabase
    const { data, error } = await supabase
      .from("plot")
      .insert([
        {
          id_plot,
          nama_plot,
          luas_area,
          tanggal_tanam,
          tanggal_transplanting,
          varietas,
          latitude,
          longitude,
          jumlah_bibit,
        },
      ])
      .select(); // To return the data inserted

    if (error) {
      throw new Error(error.message);
    }

    return data[0]; // Return the plot data inserted
  } catch (error) {
    throw new Error("Failed to add plot: " + error.message);
  }
}

async function bulkAddPlotsToDb(plots) {
  try {
    // Insert all plots into the plot table in Supabase
    const { data, error } = await supabase.from("plot").insert(plots).select(); // Return inserted data

    if (error) {
      throw new Error(error.message);
    }

    return data; // Return list of inserted plots
  } catch (error) {
    throw new Error("Failed to bulk insert plots: " + error.message);
  }
}

async function getAllPlotsFromDb() {
  try {
    const { data, error } = await supabase.from("plot").select("*");

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    throw new Error("Failed to get plots: " + error.message);
  }
}

async function updatePlotInDb({
  id_plot,
  nama_plot,
  luas_area,
  tanggal_tanam,
  tanggal_transplanting,
  varietas,
  latitude,
  longitude,
  jumlah_bibit,
}) {
  try {
    // Update data di tabel plot Supabase
    const { data, error } = await supabase
      .from("plot")
      .update({
        nama_plot,
        luas_area,
        tanggal_tanam,
        tanggal_transplanting,
        varietas,
        latitude,
        longitude,
        jumlah_bibit,
      })
      .eq("id_plot", id_plot)
      .select(); // Return data yang diupdate

    if (error) {
      throw new Error(error.message);
    }

    return data[0]; // Return plot yang udah diupdate
  } catch (error) {
    throw new Error("Failed to update plot: " + error.message);
  }
}

async function bulkUpdatePlotsToDb(plots) {
  try {
    // Update satu per satu (Supabase gak support bulk update)
    const updatedPlots = [];

    for (const plot of plots) {
      const { data, error } = await supabase
        .from("plot")
        .update({
          nama_plot: plot.nama_plot,
          luas_area: plot.luas_area,
          tanggal_tanam: plot.tanggal_tanam,
          tanggal_transplanting: plot.tanggal_transplanting,
          varietas: plot.varietas,
          latitude: plot.latitude,
          longitude: plot.longitude,
          jumlah_bibit: plot.jumlah_bibit,
        })
        .eq("id_plot", plot.id_plot)
        .select();

      if (error) {
        throw new Error(
          `Failed to update plot ${plot.id_plot}: ${error.message}`
        );
      }

      if (data && data.length > 0) {
        updatedPlots.push(data[0]);
      }
    }

    return updatedPlots; // Return list plot yang diupdate
  } catch (error) {
    throw new Error("Failed to bulk update plots: " + error.message);
  }
}

async function deletePlotFromDb(id_plot) {
  try {
    // Delete data dari tabel plot di Supabase
    const { error } = await supabase
      .from("plot")
      .delete()
      .eq("id_plot", id_plot);

    if (error) {
      throw new Error(error.message);
    }

    return { success: true };
  } catch (error) {
    throw new Error("Failed to delete plot: " + error.message);
  }
}

// Update module.exports
module.exports = {
  addPlotToDb,
  bulkAddPlotsToDb,
  getAllPlotsFromDb,
  updatePlotInDb,
  bulkUpdatePlotsToDb,
  deletePlotFromDb,
};
