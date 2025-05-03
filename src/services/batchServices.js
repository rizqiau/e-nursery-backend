const supabase = require("../config/supabaseClient");

async function bulkAddOrUpdateBatchToDb(batchList) {
  try {
    const { data, error } = await supabase
      .from("batch")
      .upsert(batchList, { onConflict: "id" })
      .select();

    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error("Failed to bulk upsert batch: " + error.message);
  }
}

async function getAllBatchFromDb() {
  try {
    const { data, error } = await supabase.from("batch").select("*");
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error("Failed to get all batch: " + error.message);
  }
}

module.exports = {
  bulkAddOrUpdateBatchToDb,
  getAllBatchFromDb,
};
