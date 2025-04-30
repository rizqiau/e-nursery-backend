const supabase = require("../config/supabaseClient");

exports.uploadToSupabase = async (file) => {
  const fileName = `profile_${Date.now()}_${file.originalname}`;
  const { error } = await supabase.storage
    .from("user-profile")
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      cacheControl: "3600",
      upsert: false,
    });
  if (error) throw error;
  const { data } = supabase.storage.from("user-profile").getPublicUrl(fileName);
  return data.publicUrl;
};
