const supabase = require("../config/supabaseClient");

async function bulkAddOrUpdateBarisToDb(barisList) {
  try {
    // Pakai upsert biar gak error duplicate key
    const { data, error } = await supabase
      .from("baris")
      .upsert(barisList, { onConflict: "id" })
      .select();

    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error("Failed to bulk upsert baris: " + error.message);
  }
}

async function getAllBarisFromDb() {
  try {
    const { data, error } = await supabase.from("baris").select("*");
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error("Failed to get baris: " + error.message);
  }
}

async function deleteBarisByPlotId(plotId) {
  try {
    const { error } = await supabase
      .from("baris")
      .delete()
      .eq("id_plot", plotId);

    if (error) throw new Error(error.message);
    return { success: true };
  } catch (error) {
    throw new Error("Failed to delete baris by plot: " + error.message);
  }
}

async function deleteBarisById(barisId) {
  try {
    const { error } = await supabase.from("baris").delete().eq("id", barisId);

    if (error) throw new Error(error.message);
    return { success: true };
  } catch (error) {
    throw new Error("Failed to delete baris: " + error.message);
  }
}

module.exports = {
  bulkAddOrUpdateBarisToDb,
  getAllBarisFromDb,
  deleteBarisByPlotId,
  deleteBarisById,
};
