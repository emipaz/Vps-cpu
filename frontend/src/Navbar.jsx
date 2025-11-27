
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start' 
      });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/vae_logo.svg" alt="VAE Logo" className="logo-img" />
        <Link to="/" className="navbar-brand">Home</Link>
      </div>
      <ul className="navbar-menu">
        <li><a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')}>Sobre Nosotros</a></li>
        <li><a href="#services" onClick={(e) => handleSmoothScroll(e, 'services')}>Servicios</a></li>
        <li><a href="#team" onClick={(e) => handleSmoothScroll(e, 'team')}>Equipo</a></li>
        <li><Link to="/contacto" className="navbar-contact">Contacto</Link></li>
      </ul>
    </nav>
  );
}
