// backend/db.js
const mysql = require('mysql2');

// Configuración de la conexión
const connection = mysql.createConnection({
  host: 'localhost',      // Donde corre MySQL
  user: 'root',           // Tu usuario
  password: 'root', // Cambia esto por tu contraseña de MySQL
  database: 'gestor_tareas' // El nombre de tu base de datos
});

// Conectarse a MySQL
connection.connect((err) => {
  if (err) {
    console.error('❌ Error al conectar a MySQL:', err.message);
    return;
  }
  console.log('✅ Conectado a la base de datos MySQL');
});

module.exports = connection;