const supabase = require("../config/supabaseClient");

async function bulkAddOrUpdateVgmToDb(vgmList) {
  try {
    const { data, error } = await supabase
      .from("vgm")
      .upsert(vgmList, { onConflict: "id" })
      .select();

    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error("Failed to bulk upsert vgm: " + error.message);
  }
}

async function getAllVgmFromDb() {
  try {
    const { data, error } = await supabase.from("vgm").select("*");
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error("Failed to get all vgm: " + error.message);
  }
}

async function deleteVgmByPlotId(plotId) {
  try {
    const { error } = await supabase.from("vgm").delete().eq("id_plot", plotId);

    if (error) throw new Error(error.message);
    return { success: true };
  } catch (error) {
    throw new Error("Failed to delete VGM by plot: " + error.message);
  }
}

module.exports = {
  bulkAddOrUpdateVgmToDb,
  getAllVgmFromDb,
  deleteVgmByPlotId,
};
