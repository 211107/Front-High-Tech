import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Styles.css';
import logo from './logo.png';
import Swal from 'sweetalert2';

export const RegistroSesion = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(true);
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setValidEmail(emailPattern.test(newEmail));
    checkFormValidity(nombre, apellidos, newEmail);
  };

  const handleNombreChange = (event) => {
    const newName = event.target.value;
    setNombre(newName);
    checkFormValidity(newName, apellidos, email);
  };

  const handleApellidosChange = (event) => {
    const newApellidos = event.target.value;
    setApellidos(newApellidos);
    checkFormValidity(nombre, newApellidos, email);
  };

  const checkFormValidity = (nombre, apellidos, email) => {
    const isNameValid = nombre.trim() !== '';
    const isApellidosValid = apellidos.trim() !== '';
    const isEmailValid = email.trim() !== '' && validEmail;
    setIsFormValid(isNameValid && isApellidosValid && isEmailValid);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormValid) {
      setIsSubmitted(true); // Set this state to trigger redirection
      Swal.fire({
        icon: 'success',
        title: 'Registro Exitoso',
        text: '¡Te has registrado correctamente!',
      });
    }
  };

  return (
    <div className='login template d-flex justify-content-center align-items-center vh-100 bg-custom-color'>
      <div className='form_container p-5 rounded bg-white'>
        <form onSubmit={handleSubmit}>
          <div className='mb-4 text-center'>
            <img src={logo} alt='Logo' className='logo-img logo-small' />
            <div className='letra'>
              <h3>Registro</h3>
            </div>
          </div>
          <div className='mb-2 text-start'>
            <label htmlFor='name' className='font-weight-bold'>
              Nombre(s)
            </label>
            <input
              type='text'
              placeholder=''
              className={`form-control bg-light ${nombre.trim() === '' ? 'is-invalid' : ''}`}
              value={nombre}
              onChange={handleNombreChange}
            />
            {nombre.trim() === '' && <div className='invalid-feedback'>Este campo es requerido.</div>}
          </div>
          <div className='mb-2 text-start'>
            <label htmlFor='name' className='font-weight-bold'>
              Apellidos
            </label>
            <input
              type='text'
              placeholder=''
              className={`form-control bg-light ${apellidos.trim() === '' ? 'is-invalid' : ''}`}
              value={apellidos}
              onChange={handleApellidosChange}
            />
            {apellidos.trim() === '' && <div className='invalid-feedback'>Este campo es requerido.</div>}
          </div>
          <div className='mb-2 text-start'>
            <label htmlFor='email' className='font-weight-bold'>
              Correo
            </label>
            <input
              type='email'
              placeholder=''
              className={`form-control bg-light ${(!validEmail || email.trim() === '') ? 'is-invalid' : ''}`}
              value={email}
              onChange={handleEmailChange}
            />
            {!validEmail && <div className='invalid-feedback'>Ingresa un correo válido.</div>}
            {email.trim() === '' && <div className='invalid-feedback'>Este campo es requerido.</div>}
          </div>
          <div className='mb-2 text-start'>
            <label htmlFor='password' className='font-weight-bold'>
              Contraseña
            </label>
            <div className='password-input'>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder=''
                className='form-control bg-light'
              />
              <i
                className={`password-toggle-icon ${showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}`}
                onClick={togglePasswordVisibility}
              ></i>
            </div>
          </div>
          <div className='d-grid'>
            <button className={`btn-bg-boton btn-bg-boton text-white ${isFormValid ? '' : 'disabled'}`} disabled={!isFormValid}>
              Registrarse
            </button>
          </div>
        </form>
        {isSubmitted && (
          <div>
            <p>Te has registrado correctamente. ¡Redirigiendo a la página de inicio...</p>
            <Link to="/">Ir a la página de inicio</Link>
          </div>
        )}
      </div>
    </div>
  );
};
