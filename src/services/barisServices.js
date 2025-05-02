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

module.exports = {
  bulkAddOrUpdateBarisToDb,
  getAllBarisFromDb,
};
