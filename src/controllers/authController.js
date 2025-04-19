const { registerUser, loginUser } = require("../services/userServices");

// Handler untuk register
async function register(req, res) {
  try {
    const { id_user, nama_user, foto, email, password, role_id, wilayah_id } =
      req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email dan password wajib diisi" });
    }

    const user = await registerUser({
      id_user,
      nama_user,
      foto,
      email,
      password,
      role_id,
      wilayah_id,
    });

    res.status(201).json({
      message: "Register berhasil",
      data: {
        id_user: user.id_user,
        nama_user: user.nama_user,
        email: user.email,
        role_id: user.role_id,
        wilayah_id: user.wilayah_id,
        foto: user.foto,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Handler untuk login
async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email dan password wajib diisi" });
    }

    const user = await loginUser(email, password);

    res.status(200).json({
      message: "Login berhasil",
      data: {
        id_user: user.id_user,
        nama_user: user.nama_user,
        email: user.email,
        role_id: user.role_id,
        wilayah_id: user.wilayah_id,
        foto: user.foto,
      },
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

module.exports = {
  register,
  login,
};
