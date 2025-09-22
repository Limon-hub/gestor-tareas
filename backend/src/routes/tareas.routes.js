// backend/src/routes/tareas.routes.js
const express = require('express');
const router = express.Router();
const db = require('../../db'); // Conexión a MySQL

// ✅ Ruta para obtener todas las tareas
router.get('/', (req, res) => {
  const query = 'SELECT * FROM tareas ORDER BY creado_en DESC';

  db.query(query, (err, results) => {
    if (err) {
      console.error('❌ Error al obtener las tareas:', err.message);
      return res.status(500).json({ error: 'Error al obtener las tareas' });
    }

    res.json(results); // Devuelve todas las tareas en formato JSON
  });
});

module.exports = router;
