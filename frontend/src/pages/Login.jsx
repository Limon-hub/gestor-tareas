// frontend/src/pages/Login.jsx
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.msg || "Error al iniciar sesión");

      login(data.usuario, data.token); // Guardar sesión
      navigate("/tareas"); // Redirigir a tareas
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h1 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            className="border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600 transition-colors"
          >
            Entrar
          </button>

          <a
            href="/register"
            className="bg-green-500 text-white rounded-lg py-2 hover:bg-green-600 transition-colors text-center"
          >
            Crear Cuenta
          </a>
        </form>
      </div>
    </div>
  );
}