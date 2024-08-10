import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ButtonLink } from "./ui/ButtonLink";
import { useState } from "react";

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHelpMenuOpen, setIsHelpMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-800 w-full my-3 flex flex-wrap items-center justify-between py-5 px-5 md:px-10 rounded-lg relative z-50">
      <div className="flex items-center space-x-4">
        <img 
          src="public/image.png" 
          alt="Logo" 
          className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 rounded-lg shadow-lg" 
        />
        <h1 className="text-base sm:text-lg md:text-2xl lg:text-3xl font-bold text-white">
          <Link to={isAuthenticated ? "/tasks" : "/"}>AndesInvest</Link>
        </h1>
      </div>
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      <ul className={`md:flex md:flex-row flex-col w-full md:w-auto gap-y-2 md:gap-x-5 md:gap-x-10 text-white text-sm sm:text-base md:text-lg lg:text-xl ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
        {isAuthenticated ? (
          <>
            <li
              className="relative"
              onMouseEnter={() => setIsAccountMenuOpen(true)}
              onMouseLeave={() => setIsAccountMenuOpen(false)}
            >
              <span className="hover:bg-blue-700 px-3 py-1 rounded cursor-pointer">Servicios bancarios</span>
              {isAccountMenuOpen && (
                <ul
                  className="absolute left-0 bg-white text-black mt-1 py-2 w-48 shadow-lg rounded-lg z-50"
                  onMouseEnter={() => setIsAccountMenuOpen(true)}
                  onMouseLeave={() => setIsAccountMenuOpen(false)}
                >
                  <li className="hover:bg-gray-200">
                    <Link to="/saldo" className="block px-4 py-2">Saldo</Link>
                  </li>
                  <li className="hover:bg-gray-200">
                    <Link to="/transferencias" className="block px-4 py-2">Transferencias</Link>
                  </li>
                  <li className="hover:bg-gray-200">
                    <Link to="/paypal" className="block px-4 py-2">Paypal</Link>
                  </li>
                  <li className="hover:bg-gray-200">
                    <Link to="/crearcuenta" className="block px-4 py-2">Crear cuenta</Link>
                  </li>
                  <li className="hover:bg-gray-200">
                    <Link to="/transacciones" className="block px-4 py-2">Transacciones</Link>
                  </li>
                </ul>
              )}
            </li>
            <li
              className="relative"
              onMouseEnter={() => setIsServicesMenuOpen(true)}
              onMouseLeave={() => setIsServicesMenuOpen(false)}
            >
              <span className="hover:bg-blue-700 px-3 py-1 rounded cursor-pointer">Pagos y recargas</span>
              {isServicesMenuOpen && (
                <ul
                  className="absolute left-0 bg-white text-black mt-1 py-2 w-48 shadow-lg rounded-lg z-50"
                  onMouseEnter={() => setIsServicesMenuOpen(true)}
                  onMouseLeave={() => setIsServicesMenuOpen(false)}
                >
                  <li className="hover:bg-gray-200">
                    <Link to="/service-bills" className="block px-4 py-2">Pago de servicios básicos</Link>
                  </li>
                  <li className="hover:bg-gray-200">
                    <Link to="/recargas-moviles" className="block px-4 py-2">Recargas móviles</Link>
                  </li>
                </ul>
              )}
            </li>
            <li
              className="relative"
              onMouseEnter={() => setIsProfileMenuOpen(true)}
              onMouseLeave={() => setIsProfileMenuOpen(false)}
            >
              <span className="hover:bg-blue-700 px-3 py-1 rounded cursor-pointer">Perfil</span>
              {isProfileMenuOpen && (
                <ul
                  className="absolute left-0 bg-white text-black mt-1 py-2 w-48 shadow-lg rounded-lg z-50"
                  onMouseEnter={() => setIsProfileMenuOpen(true)}
                  onMouseLeave={() => setIsProfileMenuOpen(false)}
                >
                  <li className="hover:bg-gray-200">
                    <Link to="/DatosPersonales" className="block px-4 py-2">Datos personales</Link>
                  </li>
                  <li className="hover:bg-gray-200">
                    <Link to="/configuracion-cuenta" className="block px-4 py-2">Configuración de la cuenta</Link>
                  </li>
                  <li className="hover:bg-gray-200">
                    <Link to="/cambiarcontra" className="block px-4 py-2">Cambiar Contraseña</Link>
                  </li>
                </ul>
              )}
            </li>
            <li
              className="relative"
              onMouseEnter={() => setIsHelpMenuOpen(true)}
              onMouseLeave={() => setIsHelpMenuOpen(false)}
            >
              <span className="hover:bg-blue-700 px-3 py-1 rounded cursor-pointer">Centro de Ayuda</span>
              {isHelpMenuOpen && (
                <ul
                  className="absolute left-0 bg-white text-black mt-1 py-2 w-48 shadow-lg rounded-lg z-50"
                  onMouseEnter={() => setIsHelpMenuOpen(true)}
                  onMouseLeave={() => setIsHelpMenuOpen(false)}
                >
                  <li className="hover:bg-gray-200">
                    <Link to="/Chat" className="block px-4 py-2">Chat en Vivo</Link>
                  </li>
                  <li className="hover:bg-gray-200">
                    <Link to="/enviar-correo" className="block px-4 py-2">Envíanos un correo</Link>
                  </li>
                  <li className="hover:bg-gray-200">
                    <Link to="/canales-digitales" className="block px-4 py-2">Canales Digitales</Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link to="/" onClick={() => logout()} className="hover:bg-red-700 bg-red-600 px-3 py-1 rounded block">
                Cerrar Sesión
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <ButtonLink to="/login">Ingresar</ButtonLink>
            </li>
            <li>
              <ButtonLink to="/register">Registrarse</ButtonLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
