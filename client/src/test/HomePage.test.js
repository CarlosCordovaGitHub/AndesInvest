import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import HomePage from '../pages/HomePage';

jest.mock('react-router-dom', () => ({
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

describe('HomePage Component', () => {
  test('renders the main header and buttons', () => {
    render(<HomePage />);
    const mainHeader = screen.getByText(/Abre tu cuenta en minutos/i);
    const startAccountButton = screen.getByText(/Comienza una Cuenta/i);
    const loginButton = screen.getByText(/Ingresa a Banca web/i);

    expect(mainHeader).toBeInTheDocument();
    expect(startAccountButton).toBeInTheDocument();
    expect(startAccountButton).toHaveAttribute('href', '/register');
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveAttribute('href', '/login');
  });

  test('renders the PayPal section with image and description', () => {
    render(<HomePage />);
    const paypalImage = screen.getByAltText(/PayPal Image/i);
    const paypalHeader = screen.getByText(/Dile hola a PayPal/i);

    expect(paypalImage).toBeInTheDocument();
    expect(paypalImage).toHaveAttribute('src', '/paypal.jpg');
    expect(paypalHeader).toBeInTheDocument();
  });

  
  test('renders the footer with links', () => {
    render(<HomePage />);
    const footerText = screen.getByText(/© 2024 Escuela Politécnica Nacional/i);
    const privacyPolicyLink = screen.getByText(/Política de Privacidad/i);
    const termsOfServiceLink = screen.getByText(/Términos de Servicio/i);

    expect(footerText).toBeInTheDocument();
    expect(privacyPolicyLink).toBeInTheDocument();
    expect(privacyPolicyLink).toHaveAttribute('href', '/privacy-policy');
    expect(termsOfServiceLink).toBeInTheDocument();
    expect(termsOfServiceLink).toHaveAttribute('href', '/terms-of-service');
  });
});
