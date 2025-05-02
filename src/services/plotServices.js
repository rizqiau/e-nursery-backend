const supabase = require("../config/supabaseClient");

async function addOrUpdatePlotToDb({
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

async function bulkAddOrUpdatePlotsToDb(plots) {
  try {
    // Ganti insert jadi upsert untuk handle duplicate key
    const { data, error } = await supabase
      .from("plot")
      .upsert(plots, { onConflict: "id_plot" }) // Kunci perubahan ada di sini
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return data; // Return list of inserted/updated plots
  } catch (error) {
    throw new Error("Failed to bulk upsert plots: " + error.message);
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
  addOrUpdatePlotToDb,
  bulkAddOrUpdatePlotsToDb,
  getAllPlotsFromDb,
  deletePlotFromDb,
};
