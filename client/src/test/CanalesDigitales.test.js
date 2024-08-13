import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import CanalesDigitales from '../pages/CanalesDigitales';

describe('CanalesDigitales Component', () => {
  test('renders the page header', () => {
    render(<CanalesDigitales />);
    const headerElement = screen.getByText(/Redes Digitales/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('renders the Facebook card with image and link', () => {
    render(<CanalesDigitales />);
    const facebookImage = screen.getByAltText(/Facebook/i);
    const facebookLink = screen.getByText(/Síguenos en Facebook/i);
    
    expect(facebookImage).toBeInTheDocument();
    expect(facebookImage).toHaveAttribute('src', '/AndesinvestFacebook.webp');
    expect(facebookLink).toBeInTheDocument();
    expect(facebookLink).toHaveAttribute('href', 'https://www.facebook.com/tu_pagina');
  });

  test('renders the Instagram card with image and link', () => {
    render(<CanalesDigitales />);
    const instagramImage = screen.getByAltText(/Instagram/i);
    const instagramLink = screen.getByText(/Síguenos en Instagram/i);
    
    expect(instagramImage).toBeInTheDocument();
    expect(instagramImage).toHaveAttribute('src', '/AndesinvestInstagram.webp');
    expect(instagramLink).toBeInTheDocument();
    expect(instagramLink).toHaveAttribute('href', 'https://www.instagram.com/tu_pagina');
  });

  test('renders the Twitter card with image and link', () => {
    render(<CanalesDigitales />);
    const twitterImage = screen.getByAltText(/Twitter/i);
    const twitterLink = screen.getByText(/Síguenos en Twitter/i);
    
    expect(twitterImage).toBeInTheDocument();
    expect(twitterImage).toHaveAttribute('src', '/AndesinvestTwitter.webp');
    expect(twitterLink).toBeInTheDocument();
    expect(twitterLink).toHaveAttribute('href', 'https://www.twitter.com/tu_pagina');
  });

  test('renders the footer', () => {
    render(<CanalesDigitales />);
    const footerText = screen.getByText(/© 2024 AndesInvest/i);
    expect(footerText).toBeInTheDocument();
  });
});
