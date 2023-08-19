import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faFile } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import logo from './logo.png';
import { useNavigate } from 'react-router-dom';


export const EditarTalentos = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [status, setStatus] = useState('');
  const [correo, setCorreo] = useState('');
  const [isCorreoValid, setIsCorreoValid] = useState(true);

  const handleCorreoChange = (e) => {
    const newCorreo = e.target.value;
    setCorreo(newCorreo);

    // Expresión regular para validar el correo electrónico
    const correoRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    setIsCorreoValid(correoRegex.test(newCorreo));
  };
  const handleFileIconClick = () => {
    setShowFileUpload(!showFileUpload);
  };
  const handleCancelFileUpload = () => {
    setShowFileUpload(false);
  };
  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    setUploadedFile(selectedFile);
    setShowFileUpload(false);
    console.log('Archivo seleccionado:', selectedFile);
  };

  const handleCalendarOpen = (isOpen) => {
    setCalendarOpen(isOpen);
  };
  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleTelefonoChange = (e) => {
    setTelefono(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };
  
  const handleRedirect = () => {
    if (!nombre || !telefono || !status) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor, completa los campos obligatorios: Nombre, Teléfono y Status.',
      });
    } else {
      // console.log('Datos guardados:', {
      //   nombre,
      //   telefono,
      //   status,
     
      // });
      
      // Redireccionar a la página DatosTalentos si los campos están completos
      navigate('/DatosTalentos');
      // Mostrar la alerta de éxito después de redireccionar
      Swal.fire({
        icon: 'success',
        title: 'Talento Creado con Éxito',
        text: 'El talento se ha creado correctamente.',
      });
    }
  };
  const isValidPhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^[0-9]{10}$/; // Ejemplo de formato: 1234567890
    return phoneNumberRegex.test(phoneNumber);
  };
  const navigate = useNavigate();

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
    <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item active">
          <Link to="/RegistrarTalentos" className="nav-link text-write nav-link-lg nav-link-bold"> Talentos</Link>
        </li>
        <li className="nav-item">
          <Link to="/DatosTalentos" className="nav-link nav-link-black nav-link-lg nav-link-bold">Registros</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>


  
    
    <div className="formulario d-flex justify-content-center align-items-center vh-100">
      <form>
        <h1>Formulario de Registro</h1><br></br>
        <div className="row">
          <div className="col-md-3 mb-3 ">
            <label htmlFor="validationDefault03" className="d-flex form-label">Proyecto</label>
            <input type="text" className="form-control borde-grueso" id="validationDefault03" 
                required
              />
          </div>
          <div className="col-md-3 mb-3">
  <label htmlFor="validationDefault05" className="d-flex form-label">Telefono<span className="required-indicator">*</span></label>
  <input
    type="text"
    className={`form-control borde-grueso ${telefono !== '' && !isValidPhoneNumber(telefono) ? 'is-invalid' : ''}`}
    id="validationDefault05"
    value={telefono}
    onChange={handleTelefonoChange}
    required
  />
  {telefono !== '' && !isValidPhoneNumber(telefono) && (
    <div className="invalid-feedback">
      Ingresa un número de teléfono válido.
    </div>
  )}
</div>


          <div className="col-md-3 mb-3">
            <label htmlFor="validationDefault06" className="d-flex form-label">Status<span className="required-indicator">*</span></label>
            <select className="form-select borde-grueso form-control" id="validationDefault06"  value={status}
  onChange={handleStatusChange}
                required
              >
              <option value="" disabled selected>Selecciona Status</option>
              <option value="enProceso">En proceso</option>
              <option value="entrevistado">Entrevistado</option>
              <option value="completo">Completo</option>
              <option value="porEntrevistar">Por entrevistar</option>
              <option value="confirmado">Confirmado</option>
              <option value="examen">Examen</option>
            </select>
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="validationDefault07" className="d-flex form-label">Conocimiento</label>
            <input type="text" className="form-control borde-grueso" id="validationDefault07" required />
          </div>
        </div>
        
        <div className="row">
          <div className={`col-md-3 mb-3 date-picker-container ${calendarOpen ? 'calendar-open' : ''}`}>
            <label htmlFor="validationDefault08" className="d-flex form-label">Fecha de inicio</label>
            <div className="input-group">
              <FontAwesomeIcon icon={faCalendar} className="date-picker-icon" />
            </div>
            <DatePicker
              selected={selectedStartDate}
              onChange={date => setSelectedStartDate(date)}
              dateFormat="dd/MM/yyyy"
              className="form-control borde-grueso"
              id="validationDefault08"
              required
              onCalendarOpen={() => handleCalendarOpen(true)}
              onCalendarClose={() => handleCalendarOpen(false)}
            />
          </div>
          <div className={`col-md-3 mb-3 date-picker-container ${calendarOpen ? 'calendar-open' : ''}`}>
            <label htmlFor="validationDefault12" className="d-flex form-label">Fecha de Fin</label>
            <div className="input-group">
              <FontAwesomeIcon icon={faCalendar} className="date-picker-icon" />
            </div>
            <DatePicker
              selected={selectedEndDate}
              onChange={date => setSelectedEndDate(date)}
              dateFormat="dd/MM/yyyy"
              className="form-control borde-grueso"
              id="validationDefault12"
              required
              onCalendarOpen={() => handleCalendarOpen(true)}
              onCalendarClose={() => handleCalendarOpen(false)}
            />
          </div>
          <div className="col-md-3 mb-3">
  <label htmlFor="validationDefault09" className="d-flex form-label">Correo</label>
  <input
    type="text"
    className={`form-control borde-grueso ${isCorreoValid ? '' : 'is-invalid'}`}
    id="validationDefault09"
    value={correo}
    onChange={handleCorreoChange}
    required
  />
  {!isCorreoValid && (
    <div className="invalid-feedback">
      Ingresa un correo electrónico válido.
    </div>
  )}
</div>
          <div className="col-md-3 mb-3">
            <label htmlFor="validationDefault10" className="d-flex form-label">Preferencias</label>
            <input type="text" className="form-control borde-grueso" id="validationDefault10" required />
          </div>
        </div>
        
        <div className="row">
          <div className="col-md-3 mb-3">
            <label htmlFor="validationDefault11" className="d-flex form-label">Roles aplicados</label>
            <input type="text" className="form-control borde-grueso" id="validationDefault11" required />
          </div>
         
          <div className="col-md-3 mb-3">
            <label htmlFor="validationDefault14" className="d-flex form-label">Experiencia</label>
            <input type="text" className="form-control borde-grueso" id="validationDefault14" required />
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="validationDefault15" className="d-flex form-label">Comentarios</label>
            <input type="text" className="form-control borde-grueso" id="validationDefault15" required />
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="validationDefault17" className="d-flex form-label">Instituto</label>
            <select className=" form-selecform-control borde-grueso" id="validationDefault17" required >
            <option value="" disabled selected>Selecciona el Instituto</option>
            <option value="cuatri">Politecnica de chiapas</option>
            <option value="cuatri">Politecnica de tapachula</option>
            <option value="cuatri">Tecnologico de la selva</option>
            <option value="cuatri">Tecnologico nac de mex.</option>
            <option value="cuatri">Universidad Tecnologico</option>
           
            </select>
          </div>
       
        </div> 
        <div className="row">
          <div className="col-md-3 mb-3">
            <label htmlFor="validationDefault16" className="d-flex form-label">Nombre<span className="required-indicator">*</span></label>
            <input type="text" className="form-control borde-grueso" id="validationDefault16"  value={nombre}
                onChange={handleNombreChange}
                required
              /> 
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="validationDefault17" className="d-flex form-label">Cuatrimestre</label>
            <select className=" form-selecform-control borde-grueso" id="validationDefault17" required >
            <option value="" disabled selected>Selecciona el Cuatrimestre</option>
            <option value="cuatri">5</option>
            <option value="cuatri">6</option>
            <option value="cuatri">7</option>
            <option value="cuatri">8</option>
            <option value="cuatri">9</option>
            <option value="cuatri">10</option>
            <option value="cuatri">11</option>
            <option value="cuatri">12</option>
            <option value="cuatri">13</option>
            <option value="cuatri">14</option>
            <option value="cuatri">15</option>
            </select>
          </div>
        
        
          <div className=" contenedor-icono-lanel col-md-3 mb-3">
            <label htmlFor="validationDefault19" className="d-flex form-label">Curriculum</label>
            <div className="input-group">
              <FontAwesomeIcon
                icon={faFile}
                className="archivo-icono"
                onClick={handleFileIconClick}
              />
              <input
                type="text"
                className="form-control borde-grueso"
                id="validationDefault19"
                required
              />
            </div>
          </div>
        </div>
      </form>
      
      {showFileUpload && (
        <div className="file-upload-card">
          <label htmlFor="fileInput" className="file-label">
            Selecciona un archivo PDF:
          </label>
          <input
            type="file"
            id="fileInput"
            accept=".pdf"
            className="form-control"
            onChange={handleFileUpload}
          />
          <button className="btn btn-danger mt-2" onClick={handleCancelFileUpload}>
            Cancelar
          </button>
        </div>
      )}

<div className="mt-4 text-center">
  <button
    className="btn-bg-boton-reg btn-bg-boton-reg text-white"
    onClick={handleRedirect}
  >
    Registrar
  </button>
</div>
    </div>
    </>
  );
};

