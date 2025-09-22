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

// ✅ Ruta para crear una nueva tarea
router.post('/', (req, res) => {
  const { titulo, descripcion } = req.body;

  // Validación básica
  if (!titulo || titulo.trim() === '') {
    return res.status(400).json({ error: 'El título es obligatorio' });
  }

  const query = `
    INSERT INTO tareas (titulo, descripcion)
    VALUES (?, ?)
  `;

  db.query(query, [titulo, descripcion], (err, result) => {
    if (err) {
      console.error('❌ Error al insertar tarea:', err.message);
      return res.status(500).json({ error: 'Error al crear la tarea' });
    }

    // Devuelve la tarea recién creada
    res.status(201).json({
      id: result.insertId,
      titulo,
      descripcion,
      completada: false,
      creado_en: new Date()
    });
  });
});




module.exports = router;
