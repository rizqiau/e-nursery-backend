const supabase = require("../config/supabaseClient");

async function bulkAddBarisToDb(barisList) {
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

async function getBarisByPlotId(plotId) {
  try {
    const { data, error } = await supabase
      .from("baris")
      .select("*")
      .eq("id_plot", plotId);

    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error(`Failed to get baris for plot ${plotId}: ${error.message}`);
  }
}

async function updateBarisInDb(baris) {
  try {
    const { data, error } = await supabase
      .from("baris")
      .update(baris)
      .eq("id", baris.id)
      .select();

    if (error) throw new Error(error.message);
    return data[0];
  } catch (error) {
    throw new Error("Failed to update baris: " + error.message);
  }
}

async function bulkUpdateBarisToDb(barisList) {
  try {
    // Pakai upsert untuk bulk update
    const { data, error } = await supabase
      .from("baris")
      .upsert(barisList, { onConflict: "id" })
      .select();

    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error("Failed to bulk update baris: " + error.message);
  }
}

async function deleteBarisFromDb(id) {
  try {
    const { error } = await supabase.from("baris").delete().eq("id", id);

    if (error) throw new Error(error.message);
    return { success: true };
  } catch (error) {
    throw new Error("Failed to delete baris: " + error.message);
  }
}

module.exports = {
  bulkAddBarisToDb,
  getAllBarisFromDb,
  getBarisByPlotId,
  updateBarisInDb,
  bulkUpdateBarisToDb,
  deleteBarisFromDb,
};
