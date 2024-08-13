import React from 'react';

const CanalesDigitales = () => {
    return (
        <div className="flex flex-col items-center p-4 md:p-8 font-sans bg-gray-100 min-h-screen">   
            <header className="page-header text-center mb-4 md:mb-8">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-900 border-b-4 border-red-600 inline-block pb-2">Redes Digitales</h1>
            </header>
            <main className="w-full">
                <section className="social-media-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    <div className="card facebook-card">
                        <div className="image-container">
                            <img src="/AndesinvestFacebook.webp" alt="Facebook" className="social-media-image" />
                        </div>
                        <h2 className="text-lg md:text-xl font-semibold">Facebook</h2>
                        <p className="text-sm md:text-base">Únete a nuestra comunidad en Facebook y mantente actualizado con las últimas noticias y promociones.</p>
                        <a href="https://www.facebook.com/tu_pagina" className="social-media-link" target="_blank" rel="noopener noreferrer">Síguenos en Facebook</a>
                    </div>
                    <div className="card instagram-card">
                        <div className="image-container">
                            <img src="/AndesinvestInstagram.webp" alt="Instagram" className="social-media-image" />
                        </div>
                        <h2 className="text-lg md:text-xl font-semibold">Instagram</h2>
                        <p className="text-sm md:text-base">Sigue nuestro perfil de Instagram para ver fotos y videos exclusivos, y participa en nuestros concursos.</p>
                        <a href="https://www.instagram.com/tu_pagina" className="social-media-link" target="_blank" rel="noopener noreferrer">Síguenos en Instagram</a>
                    </div>
                    <div className="card twitter-card">
                        <div className="image-container">
                            <img src="/AndesinvestTwitter.webp" alt="Twitter" className="social-media-image" />
                        </div>
                        <h2 className="text-lg md:text-xl font-semibold">Twitter</h2>
                        <p className="text-sm md:text-base">Conéctate con nosotros en Twitter para recibir actualizaciones en tiempo real y unirte a la conversación.</p>
                        <a href="https://www.twitter.com/tu_pagina" className="social-media-link" target="_blank" rel="noopener noreferrer">Síguenos en Twitter</a>
                    </div>
                </section>
            </main>
            <footer className="mt-8">
                <p className="text-gray-600">&copy; 2024 AndesInvest</p>
            </footer>

            <style jsx>{`
                body {
                    font-family: Arial, sans-serif;
                    background-color: #FFF; /* Fondo gris claro */
                }
                .page-header h1 {
                    color: #003366; /* Azul oscuro del logo EPN */
                    text-shadow: 2px 2px 5px rgba(0,0,0,0.2);
                }
                .card {
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                    text-align: center;
                    padding: 20px;
                    background-color: white;
                    transition: transform 0.3s;
                }
                .card:hover {
                    transform: scale(1.05);
                }
                .image-container {
                    width: 100%;
                    height: 150px;
                    overflow: hidden;
                    border-bottom: 1px solid #eee;
                    margin-bottom: 15px;
                }
                .social-media-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .facebook-card {
                    background-color: #3b5998; /* Azul de Facebook */
                    color: white;
                }
                .instagram-card {
                    background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
                    color: white;
                }
                .twitter-card {
                    background-color: #1da1f2; /* Azul de Twitter */
                    color: white;
                }
                .social-media-link {
                    display: inline-block;
                    margin-top: 10px;
                    padding: 10px 15px;
                    border-radius: 5px;
                    background-color: rgba(255, 255, 255, 0.2);
                    color: white;
                    text-decoration: none;
                    transition: background-color 0.3s;
                }
                .social-media-link:hover {
                    background-color: rgba(255, 255, 255, 0.4);
                }
            `}</style>
        </div>
    );
};

export default CanalesDigitales;
