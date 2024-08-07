import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecovery } from '../context/recoveryContext'; // Importa el contexto de recuperación

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { forgotPassword } = useRecovery(); // Utiliza la función del contexto de recuperación

  const handleSubmitEmail = async (e) => {
    e.preventDefault();

    try {
      await forgotPassword(email);
      navigate('/verify-code', { state: { email } });
    } catch (error) {
      console.error('Error:', error);
      setError('Correo incorrecto o inexistente, reintentar');
    }
  };
//Holaa
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-blue-500 mb-4">Recuperar contraseña</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmitEmail}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico:</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              style={{ color: 'black' }}
            />
          </div>
          <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition-colors">
            Enviar código de verificación
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
