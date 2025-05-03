const supabase = require("../config/supabaseClient");

async function bulkAddOrUpdateVgmHistoryToDb(vgmHistoryList) {
  try {
    const { data, error } = await supabase
      .from("vgm_history")
      .upsert(vgmHistoryList, { onConflict: "id" })
      .select();

    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error("Failed to bulk upsert vgm history: " + error.message);
  }
}

async function getAllVgmHistoryFromDb() {
  try {
    const { data, error } = await supabase.from("vgm_history").select("*");
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error("Failed to get all vgm history: " + error.message);
  }
}

module.exports = {
  bulkAddOrUpdateVgmHistoryToDb,
  getAllVgmHistoryFromDb,
};
