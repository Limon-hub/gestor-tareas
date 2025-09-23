// frontend/src/pages/Register.jsx
export default function Register() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h1 className="text-2xl font-bold mb-4 text-center">Crear Cuenta</h1>
        <form className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Nombre de usuario"
            className="border rounded-lg p-2 focus:outline-none focus:ring focus:ring-green-400"
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            className="border rounded-lg p-2 focus:outline-none focus:ring focus:ring-green-400"
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="border rounded-lg p-2 focus:outline-none focus:ring focus:ring-green-400"
          />
          <button
            type="submit"
            className="bg-green-500 text-white rounded-lg py-2 hover:bg-green-600 transition-colors"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}