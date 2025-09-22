// backend/src/routes/index.js
const express = require('express');
const router = express.Router();

// Importa el archivo de rutas de tareas
const tareasRoutes = require('./tareas.routes');

router.use('/tareas', tareasRoutes);

module.exports = router;