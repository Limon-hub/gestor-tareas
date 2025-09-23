// frontend/src/pages/Register.jsx
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.msg || "Error al registrar");

      // Auto login después de registrarse
      const loginRes = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const loginData = await loginRes.json();
      if (!loginRes.ok) throw new Error(loginData.msg || "Error al iniciar sesión");

      login(loginData.usuario, loginData.token); // Guardar sesión
      navigate("/tareas"); // Redirigir a tareas
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h1 className="text-2xl font-bold mb-4 text-center">Crear Cuenta</h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre de usuario"
            className="border rounded-lg p-2 focus:outline-none focus:ring focus:ring-green-400"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            className="border rounded-lg p-2 focus:outline-none focus:ring focus:ring-green-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="border rounded-lg p-2 focus:outline-none focus:ring focus:ring-green-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-500 text-white rounded-lg py-2 hover:bg-green-600 transition-colors"
          >
            Registrarse
          </button>
          <a
            href="/login"
            className="bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600 transition-colors text-center"
          >
            Iniciar Sesion
          </a>
        </form>
      </div>
    </div>
  );
}