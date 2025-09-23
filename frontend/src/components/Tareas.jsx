import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Tareas() {
    const [tareas, setTareas] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const [editandoId, setEditandoId] = useState(null);
    const [editTitulo, setEditTitulo] = useState('');
    const [editDescripcion, setEditDescripcion] = useState('');

  const API_URL = 'http://localhost:3000/api/tareas';

  // Obtener todas las tareas
  const fetchTareas = async () => {
    try {
      const res = await axios.get(API_URL);
      setTareas(res.data);
    } catch (err) {
      console.error(err);
    }
  };

const iniciarEdicion = (tarea) => {
    setEditandoId(tarea.id);
    setEditTitulo(tarea.titulo);
    setEditDescripcion(tarea.descripcion);
};


const guardarEdicion = async (id) => {
  if (!editTitulo) return alert('El título es obligatorio');
  await axios.put(`${API_URL}/${id}/editar`, { titulo: editTitulo, descripcion: editDescripcion });
  setEditandoId(null);
  setEditTitulo('');
  setEditDescripcion('');
  fetchTareas();
};

  // Crear nueva tarea
  const crearTarea = async () => {
    if (!titulo) return;
    await axios.post(API_URL, { titulo, descripcion });
    setTitulo('');
    setDescripcion('');
    fetchTareas();
  };

  // Actualizar completada
  const actualizarTarea = async (id, completada) => {
    console.log('Haciendo clic en la tarea con ID:', id, 'Estado actual:', completada);

    await axios.put(`${API_URL}/${id}`, { completada: !completada });
    fetchTareas();
  };

  // Eliminar tarea
  const eliminarTarea = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchTareas();
  };

  useEffect(() => {
    fetchTareas();
  }, []);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Gestor de Tareas</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1"
          placeholder="Título"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
        />
        <input
          className="border p-2 flex-1"
          placeholder="Descripción"
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2"
          onClick={crearTarea}
        >
          Agregar
        </button>
      </div>

      <ul className="space-y-2">
        {tareas.map(t => (
  <li key={t.id} className="flex justify-between items-center border p-2">
    {editandoId === t.id ? (
      <>
        <input
          className="border p-1 flex-1 mr-2"
          value={editTitulo}
          onChange={e => setEditTitulo(e.target.value)}
        />
        <input
          className="border p-1 flex-1 mr-2"
          value={editDescripcion}
          onChange={e => setEditDescripcion(e.target.value)}
        />
        <button
          className="bg-green-500 text-white px-2 py-1 mr-2"
          onClick={() => guardarEdicion(t.id)}
        >
          Guardar
        </button>
        <button
          className="bg-gray-500 text-white px-2 py-1"
          onClick={() => setEditandoId(null)}
        >
          Cancelar
        </button>
      </>
    ) : (
      <>
        <span
          className={t.completada ? 'line-through cursor-pointer' : 'cursor-pointer'}
          onClick={() => actualizarTarea(t.id, t.completada)}
        >
          {t.titulo} - {t.descripcion}
        </span>
        <div className="flex gap-2">
          <button
            className="bg-blue-500 text-white px-2 py-1"
            onClick={() => iniciarEdicion(t)}
          >
            Editar
          </button>
          <button
            className="bg-red-500 text-white px-2 py-1"
            onClick={() => eliminarTarea(t.id)}
          >
            Eliminar
          </button>
        </div>
      </>
    )}
  </li>
))}
      </ul>
    </div>
  );
}
