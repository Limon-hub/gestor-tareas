import React, { useState, useEffect, useContext  } from 'react';
import axios from 'axios';
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Tareas() {
    const [tareas, setTareas] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const [editandoId, setEditandoId] = useState(null);
    const [editTitulo, setEditTitulo] = useState('');
    const [editDescripcion, setEditDescripcion] = useState('');

  const API_URL = 'http://localhost:3000/api/tareas';


  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();            // Limpia token y usuario
    navigate("/login");  // Redirige a login
  };

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

  
    <div className="p-6 max-w-xl mx-auto bg-gray-100 rounded-lg shadow-md mt-10 relative">
      {/* Botón fijo arriba a la derecha */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
      >
        Cerrar sesión
      </button>
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Gestor de Tareas</h1>

      {/* Formulario de creación */}
      <div className="flex gap-3 mb-6">
        <input
          className="border border-gray-300 rounded-md p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Título"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
        />
        <input
          className="border border-gray-300 rounded-md p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Descripción"
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md transition-colors"
          onClick={crearTarea}
        >
          Agregar
        </button>
      </div>

      {/* Lista de tareas */}
      <ul className="space-y-3">
        {tareas.map(t => (
          <li
            key={t.id}
            className={`flex justify-between items-center border p-3 rounded-md shadow-sm transition-colors
              ${t.completada ? 'bg-green-50 line-through text-gray-500' : 'bg-white'}`}
          >
            {editandoId === t.id ? (
              <div className="flex gap-2 flex-1 flex-wrap items-center">
                <input
                  className="border border-gray-300 rounded-md p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-green-400"
                  value={editTitulo}
                  onChange={e => setEditTitulo(e.target.value)}
                />
                <input
                  className="border border-gray-300 rounded-md p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-green-400"
                  value={editDescripcion}
                  onChange={e => setEditDescripcion(e.target.value)}
                />
                <button
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md min-w-[70px]"
                onClick={() => guardarEdicion(t.id)}
                >
                Guardar
                </button>
                <button
                className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded-md min-w-[70px]"
                onClick={() => setEditandoId(null)}
                >
                Cancelar
                </button>
              </div>
            ) : (
              <>
                <span
                  className="cursor-pointer flex-1"
                  onClick={() => actualizarTarea(t.id, t.completada)}
                >
                  {t.titulo} - {t.descripcion}
                </span>
                <div className="flex gap-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
                    onClick={() => iniciarEdicion(t)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
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
