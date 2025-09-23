// backend/src/routes/index.js
const express = require('express');
const router = express.Router();

// Importa el archivo de rutas de tareas
const tareasRoutes = require('./tareas.routes');

// Importa el archivo de rutas de autenticación
const authRoutes = require('./auth');

// Rutas
router.use('/tareas', tareasRoutes);
router.use('/auth', authRoutes);

module.exports = router;