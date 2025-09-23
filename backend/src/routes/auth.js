const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../../db");
const SECRET = "mi_secreto_para_jwt";

// Registro de usuario
router.post("/register", async (req, res) => {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
        return res.status(400).json({ msg: "Faltan datos" });
    }

    // Verificar si el usuario ya existe
    const [usuarios] = await db.promise().query("SELECT * FROM usuarios WHERE email = ?", [email]);
    if (usuarios.length > 0) return res.status(400).json({ msg: "Usuario ya existe" });

    // Hashear contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Guardar usuario
    await db.promise().query("INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)", [nombre, email, hashedPassword]);

    res.json({ msg: "Usuario registrado correctamente" });
});

// Login de usuario
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ msg: "Faltan datos" });

    const [usuarios] = await db.promise().query("SELECT * FROM usuarios WHERE email = ?", [email]);
    if (usuarios.length === 0) return res.status(400).json({ msg: "Usuario no encontrado" });

    const usuario = usuarios[0];

    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) return res.status(400).json({ msg: "Contraseña incorrecta" });

    // Crear token JWT
    const token = jwt.sign({ id: usuario.id }, SECRET, { expiresIn: "1h" });

    res.json({ token, usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email } });
});

module.exports = router;