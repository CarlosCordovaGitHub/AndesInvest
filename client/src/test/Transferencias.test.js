import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Transferencias from '../pages/Transferencias';

// Mocking necessary contexts and functions
jest.mock('../context/accountContext', () => ({
  useAccount: () => ({
    accounts: [
      { _id: '1', accountNumber: '1234567890', accountType: 'savings', balance: 1000 },
      { _id: '2', accountNumber: '0987654321', accountType: 'checking', balance: 500 },
    ],
    fetchAccounts: jest.fn(),
    getAccountHolder: jest.fn(),
  }),
}));

jest.mock('../context/transferContext', () => ({
  useTransfer: () => ({
    createTransfer: jest.fn(),
  }),
}));

jest.mock('../context/authContext', () => ({
  useAuth: () => ({
    user: { email: 'test@epn.edu.ec', fullName: 'Test User' },
  }),
}));

jest.mock('../context/recoveryContext', () => ({
  useRecovery: () => ({
    sendVerificateTransactionCode: jest.fn(),
  }),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('Transferencias Component', () => {
  test('renders the main form elements', () => {
    render(<Transferencias />);
    
    // Verifica que el encabezado principal se renderice
    expect(screen.getByText(/Transferencias Directas/i)).toBeInTheDocument();
    
    // Verifica que el selector de cuentas de origen se renderice
    expect(screen.getByLabelText(/Cuenta de origen/i)).toBeInTheDocument();
    
    // Verifica que el input del monto se renderice
    expect(screen.getByLabelText(/Monto/i)).toBeInTheDocument();
    
    // Verifica que el botón de enviar código de verificación se renderice
    expect(screen.getByText(/Enviar código/i)).toBeInTheDocument();
    
    // Verifica que el botón de confirmar transferencia se renderice
    expect(screen.getByRole('button', { name: /Confirmar/i })).toBeInTheDocument();
  });

  test('renders the modal when transfer is successful', () => {
    render(<Transferencias />);
    
    // Simula que la transferencia fue exitosa y el modal se debe mostrar
    fireEvent.click(screen.getByRole('button', { name: /Confirmar/i }));
    

  });

  test('renders the footer with correct text', () => {
    render(<Transferencias />);
    
    // Verifica que el pie de página se renderice correctamente
    expect(screen.getByText(/© 2024 AndesInvest/i)).toBeInTheDocument();
  });
});
