import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecovery } from '../context/recoveryContext'; // Importa el contexto de recuperación

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const { resetPassword } = useRecovery(); // Utiliza la función del contexto de recuperación

  if (!email) {
    return <p>No se proporcionó ningún correo electrónico.</p>;
  }

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await resetPassword(email, newPassword);
      if (response.status === 200) {
        setSuccess('Contraseña cambiada con éxito');
        setError('');
        setTimeout(() => {
          navigate('/login'); // Redirige a la página de inicio de sesión después de 2 segundos
        }, 3000);
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.status === 400) {
        setError('Error al cambiar la contraseña');
      } else if (error.response && error.response.status === 404) {
        setError('Usuario no encontrado');
      } else {
        setError('Error al cambiar la contraseña');
      }
      setSuccess('');
    }
  };

  return (
    <div style={{ backgroundColor: '#1a202c', color: 'white', height: '100vh' }} className="flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-blue-500 mb-4">Restablecer contraseña</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && (
          <p style={{
            color: 'green',
            backgroundColor: '#d4edda',
            border: '1px solid #c3e6cb',
            padding: '0.75rem',
            borderRadius: '0.375rem',
            textAlign: 'center'
          }}>
            {success}
          </p>
        )}
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">Nueva contraseña:</label>
            <input 
              type="password" 
              id="newPassword" 
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
              required 
              style={{
                color: 'black',
                padding: '0.5rem',
                border: '1px solid #ccc',
                borderRadius: '0.375rem',
                width: '100%',
                boxSizing: 'border-box',
                marginBottom: '1rem'
              }}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmar nueva contraseña:</label>
            <input 
              type="password" 
              id="confirmPassword" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
              style={{
                color: 'black',
                padding: '0.5rem',
                border: '1px solid #ccc',
                borderRadius: '0.375rem',
                width: '100%',
                boxSizing: 'border-box',
                marginBottom: '1rem'
              }}
            />
          </div>
          <button type="submit" style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '0.5rem',
            borderRadius: '0.375rem',
            width: '100%',
            border: 'none',
            cursor: 'pointer'
          }}>
            Cambiar contraseña
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
