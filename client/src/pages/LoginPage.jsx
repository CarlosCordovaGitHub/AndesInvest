import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Message, Button, Input, Label } from "../components/ui";
import { loginSchema } from "../schemas/auth";

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { signin, errors: loginErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data) => signin(data);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks");
    }
  }, [isAuthenticated]);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-full h-full">
        {/* Navbar */}
        <nav>
          <ul>
            <li><Link to="/cuenta">Cuenta</Link></li>
            <li><Link to="/servicios">Servicios</Link></li>
            <li><Link to="/perfil">Perfil</Link></li>
            <li>
              <span>Centro de Ayuda</span>
              <ul>
                <li><Link to="/chat-en-vivo">Chat en Vivo</Link></li>
                <li><Link to="/envianos-un-correo">Envíanos un correo</Link></li>
                <li><Link to="/canales-digitales">Canales Digitales</Link></li>
              </ul>
            </li>
          </ul>
        </nav>

        {/* Rest of the Login Page */}
        <div className="flex-1 flex flex-col items-center justify-center bg-white p-10 relative">
          <img src="public/bovedaAndes.webp" alt="Banner" className="absolute inset-0 w-full h-full object-cover opacity-30" />
          <div className="w-full max-w-md p-8 bg-gray-800 text-white rounded-lg shadow-lg relative z-10" style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}>
            {loginErrors.map((error, i) => (
              <Message message={error} key={i} />
            ))}
            <h1 className="text-3xl font-bold text-blue-500 mb-4">Iniciar Sesión</h1>

            <form className="text-xl" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <Label htmlFor="email" className="block text-sm font-medium text-gray-200">Correo:</Label>
                <Input 
                  label="Escribe tu correo"
                  type="email"
                  name="email"
                  placeholder="tucorreo@gmail.com"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  {...register("email", { required: true })}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>

              <div className="mb-6">
                <Label htmlFor="password" className="block text-sm font-medium text-gray-200">Contraseña:</Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="Escribe tu contraseña"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  {...register("password", { required: true, minLength: 6 })}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
              </div>

              <Button className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition-colors">
                Iniciar
              </Button>
            </form>

            <p className="flex gap-x-2 justify-between mt-4">
              No tienes una cuenta? <Link to="/register" className="text-blue-500 hover:text-blue-400">Registrarse</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
