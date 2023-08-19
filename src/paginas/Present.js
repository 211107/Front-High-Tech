// Present.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Present.css';
import logo from './logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importa FontAwesomeIcon
import { faUserPlus,faListAlt } from '@fortawesome/free-solid-svg-icons'; // Importa el icono faUserPlus
export const Present = () => {
  return (
    <>
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <a className="navbar-brand" href="#">
        <img src={logo} alt='Logo' className='logo-img logo-small' />
        </a>
    
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse centered-buttons-container" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to="/RegistrarTalentos" className="nav-link text-write nav-link-lg nav-link-bold">Registrar Talentos</Link>
            </li>
            <li className="nav-item ">
              <Link to="/DatosTalentos" className="nav-link nav-link-black nav-link-lg nav-link-bold">Registros</Link>
            </li>
            <li className="nav-item">
     
     <Link to="/" className="enterede-buttones btn-bg-boton-reg text-white">
     Cerrar Sesion
   </Link>
   </li>
          </ul>
        </div>
      </div>
    </nav>

    <div className="present-container">
      <div className="background-image">
      
      <Link to="/RegistrarTalentos" className="centered-button btn-bg-boton-reg text-white">
            <FontAwesomeIcon icon={faUserPlus} /> Registrar
          </Link>
        <div>
        <Link to="/DatosTalentos" className="centered-buttones btn-bg-boton-reg text-white">
        <FontAwesomeIcon icon={faListAlt} />Registros 
        </Link>
        </div>
        
      </div>
    </div>
    </>
  );
};
