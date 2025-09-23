// frontend/src/pages/Login.jsx
export default function Login() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h1 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h1>
        <form className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            className="border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600 transition-colors"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}