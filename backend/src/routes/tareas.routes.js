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

// ====================
// ACTUALIZAR UNA TAREA (solo el estado completada)
// ====================
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { completada } = req.body;

  console.log('Body recibido en PUT:', req.body);

  const sql = `
    UPDATE tareas
    SET completada = ?
    WHERE id = ?
  `;

  db.query(sql, [completada, id], (err, result) => {
    if (err) {
      console.error('❌ Error al actualizar tarea:', err.message);
      return res.status(500).json({ error: 'Error en el servidor' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    res.json({ message: '✅ Estado de la tarea actualizado correctamente' });
  });
});

// ====================
// EDITAR TÍTULO Y DESCRIPCIÓN
// ====================
router.put('/:id/editar', (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion } = req.body;

  // Validación básica
  if (!titulo || titulo.trim() === '') {
    return res.status(400).json({ error: 'El título es obligatorio' });
  }

  const sql = `
    UPDATE tareas
    SET titulo = ?, descripcion = ?
    WHERE id = ?
  `;

  db.query(sql, [titulo, descripcion, id], (err, result) => {
    if (err) {
      console.error('❌ Error al editar tarea:', err.message);
      return res.status(500).json({ error: 'Error en el servidor' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    res.json({ message: '✅ Tarea editada correctamente' });
  });
});

// ====================
// ELIMINAR UNA TAREA
// ====================
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM tareas WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('❌ Error al eliminar tarea:', err);
      return res.status(500).json({ error: 'Error en el servidor' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    res.json({ message: '🗑️ Tarea eliminada correctamente' });
  });
});


module.exports = router;
