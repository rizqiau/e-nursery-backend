const supabase = require("../config/supabaseClient");
const bcrypt = require("bcrypt");

// Function untuk register user baru
async function registerUser({
  id_user,
  nama_user,
  foto,
  email,
  password,
  role_id,
  wilayah_id,
}) {
  try {
    // Hash password dulu sebelum simpan
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert ke tabel user di Supabase
    const { data, error } = await supabase
      .from("user")
      .insert([
        {
          id_user,
          nama_user,
          foto,
          email,
          password: hashedPassword,
          role_id,
          wilayah_id,
        },
      ])
      .select(); // biar return data

    if (error) {
      throw new Error(error.message);
    }

    return data[0]; // return user yang baru didaftarkan
  } catch (error) {
    throw error;
  }
}

// Function untuk login
async function loginUser(email, password) {
  try {
    // Cari user berdasarkan email
    const { data, error } = await supabase
      .from("user")
      .select("*")
      .eq("email", email)
      .single(); // ambil 1 record aja

    if (error) {
      throw new Error("Email tidak ditemukan");
    }

    // Bandingkan password yang dikirim dengan yang dihash
    const isPasswordMatch = await bcrypt.compare(password, data.password);
    if (!isPasswordMatch) {
      throw new Error("Password salah");
    }

    return data; // return data user
  } catch (error) {
    throw error;
  }
}

module.exports = {
  registerUser,
  loginUser,
};
