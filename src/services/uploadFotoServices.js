const supabase = require("../config/supabaseClient");

exports.uploadFotoToSupabase = async (file) => {
  const fileName = file.originalname;
  const { error } = await supabase.storage
    .from("vgm-history")
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      cacheControl: "3600",
      upsert: false,
    });
  if (error) throw error;
  const { data } = supabase.storage.from("vgm-history").getPublicUrl(fileName);
  return data.publicUrl;
};
