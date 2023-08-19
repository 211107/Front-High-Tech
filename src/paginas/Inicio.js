import React, { useState } from 'react';
import './Styles.css';
import logo from './logo.png';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const Inicio = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validEmail, setValidEmail] = useState(true);
  const [loginMessage, setLoginMessage] = useState('');
  const navigate = useNavigate(); // Instancia de useNavigate para redireccionamiento

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setValidEmail(emailPattern.test(newEmail));
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    // Simulación de autenticación con datos establecidos en la consola
    const correctEmail = 'ejemplo@correo.com';
    const correctPassword = 'contraseña';

    if (validEmail && email === correctEmail && password === correctPassword) {
      // Autenticación exitosa
      setLoginMessage('Autenticación exitosa');
      
      // Redirigir a la página de DatosTalentos
      navigate('/Present');
    } else {
      // Autenticación fallida
      setLoginMessage('Autenticación fallida');
    }
  };

  return (
    <div className='login template d-flex justify-content-center align-items-center vh-100 bg-custom-color'>
      <div className='form_container p-5 rounded bg-white'>
        <form>
          <div className='mb-4 text-center'>
            <img src={logo} alt='Logo' className='logo-img logo-small' />
            <div className='letra'>
              <h3>Inicio de sesión</h3>
            </div>
          </div>
          <div className='mb-2 text-start'>
            <label htmlFor='email' className='font-weight-bold'>
              Correo
            </label>
            <input
              type='email'
              placeholder=''
              className={`form-control bg-light ${validEmail ? '' : 'is-invalid'}`}
              value={email}
              onChange={handleEmailChange}
            />
            {!validEmail && <div className='invalid-feedback'>Ingresa un correo válido.</div>}
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
                value={password}
                onChange={handlePasswordChange}
              />
              <i
                className={`password-toggle-icon ${showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}`}
                onClick={togglePasswordVisibility}
              ></i>
            </div>
          </div>
          <div className='d-grid'>
            <button
              className='btn-bg-boton btn-bg-boton text-white'
              onClick={handleLogin}
              disabled={!validEmail || !password}
            >
              Iniciar Sesión
            </button>
          </div>
          {loginMessage && (
            <p className={`alert ${loginMessage === 'Autenticación exitosa' ? 'alert-success' : 'alert-danger'}`}>
              {loginMessage}
            </p>
          )}
          <div className='text-custom-color'>
            <Link to='/RegistroSesion'>Registrarse</Link>
          </div>
        </form>
      </div>
    </div>
  );
};