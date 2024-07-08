import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Card, Message, Button, Input, Label } from "../components/ui";
import { useForm } from "react-hook-form";
import { registerSchema } from "../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";

function Register() {
  const { signup, errors: registerErrors, isAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (value) => {
    await signup(value);
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl shadow-lg rounded-lg overflow-hidden">
        {/* Left Section */}
        <div className="flex-1 bg-white p-10">
          <Card className="w-full p-8 bg-gray-100 rounded-lg shadow-lg">
            {registerErrors.map((error, i) => (
              <Message message={error} key={i} />
            ))}
            <h1 className="text-3xl font-bold text-blue-900 mb-4">Regístrate</h1>
            <p className="text-gray-600 mb-6">Para continuar, necesitamos que ingreses tu información para crear una cuenta.</p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="username" className="block text-sm font-medium text-gray-700">Nombre de Usuario:</Label>
                <Input
                  type="text"
                  name="username"
                  placeholder="Escribe tu nombre"
                  {...register("username")}
                  autoFocus
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {errors.username?.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.username?.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico:</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="tucorreo@gmail.com"
                  {...register("email")}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {errors.email?.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña:</Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="********"
                  {...register("password")}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {errors.password?.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmar Contraseña:</Label>
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="********"
                  {...register("confirmPassword")}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {errors.confirmPassword?.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword?.message}</p>
                )}
              </div>
              
              <Button className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition-colors">
                Continuar
              </Button>
            </form>
            <p className="mt-4 text-center text-gray-600">
              ¿Ya tienes una cuenta? <Link className="text-blue-500 hover:text-blue-400" to="/login">Iniciar Sesión</Link>
            </p>
          </Card>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex flex-1 items-center justify-center bg-blue-200 p-10">
          <div className="text-center">
            <img src="public/id_card.svg" alt="Validation" className="w-24 h-24 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-blue-900 mb-2">Valida tu identidad</h2>
            <p className="text-blue-900">Para continuar, necesitamos que ingreses tu número de identificación y el código dactilar para validar tu identidad.</p>
            <p className="mt-4 text-sm text-blue-900">El código de huella dactilar puedes encontrarlo en la parte posterior de la cédula</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
