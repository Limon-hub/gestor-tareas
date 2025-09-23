// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Tareas from "./components/Tareas";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          {/* Redirige la raíz a /login */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Autenticación */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Gestor de tareas */}
          <Route
            path="/tareas"
            element={
              <PrivateRoute>
                <div className="flex items-start justify-center py-10">
                  <Tareas />
                </div>
              </PrivateRoute>
            }
          />

          {/* 404 - Página no encontrada */}
          <Route
            path="*"
            element={
              <h1 className="text-center mt-20 text-2xl">
                404 - Página no encontrada
              </h1>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}