import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { token } = useContext(AuthContext);

  if (!token) {
    // Si no hay token, redirige a login
    return <Navigate to="/login" />;
  }

  // Si hay token, muestra la ruta
  return children;
}