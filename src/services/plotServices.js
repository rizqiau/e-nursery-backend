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

module.exports = {
  addPlotToDb,
};
