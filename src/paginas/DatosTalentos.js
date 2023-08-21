import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import logo from './logo.png';
import { faTrash, faEdit, faSave, faTimes, faSearch, faEye, faDownload } from '@fortawesome/free-solid-svg-icons';


export const DatosTalentos = () => {
  const [tableData, setTableData] = useState([
    {
      "No°": 1,
      "Empresa": "Universidad Politecnica",
      "Modalidad": "Presencial",
      "Servicio": "Estancia",
      "Proyecto": "TechHunters",
      "Fecha de inicio": "15/08/2023",
      "Fecha Fin": "23/08/2023",
      "Nombre": "Esmeralda G.pe Morales Leon",
      "Telefono": "9681048130",
      "Correo": "211107@ids.upchipas.edu.mx",
      "Instituto": 8,
      "Cuatrimestre": "Online",
      "Estatus": "preferencias",
      "Preferencias": "ninguno",
      "Experiencias": "Solo en la universidad",
      "Comentarios": "ninguno",
      "Calificacion": 9,
      "Roles": "Requerimientos",
      "Curriculum": "nopi"
    },
    {
      "No°": 2,
      "Empresa": "Universidad Politecnica",
      "Modalidad": "Presencial",
      "Servicio": "Estancia",
      "Proyecto": "TechHunters",
      "Fecha de inicio": "15/08/2023",
      "Fecha Fin": "23/08/2023",
      "Nombre": "Roberto Antonio Camacho Rodriguez",
      "Telefono": "9681048130",
      "Correo": "211107@ids.upchipas.edu.mx",
      "Instituto": 8,
      "Cuatrimestre": "Online",
      "Estatus": "preferencias",
      "Preferencias": "ninguno",
      "Experiencias": "Solo en la universidad",
      "Comentarios": "ninguno",
      "Calificacion":10,
      "Roles": "Requerimientos",
      "Curriculum": "nopi"
    },
    {
      "No°": 3,
      "Empresa": "Universidad Politecnica",
      "Modalidad": "Presencial",
      "Servicio": "Estancia",
      "Proyecto": "TechHunters",
      "Fecha de inicio": "15/08/2023",
      "Fecha Fin": "23/08/2023",
      "Nombre": "Alberto Vazquez Miranda",
      "Telefono": "9681048130",
      "Correo": "211107@ids.upchipas.edu.mx",
      "Instituto": 9,
      "Cuatrimestre": "Online",
      "Estatus": "preferencias",
      "Preferencias": "ninguno",
      "Experiencias": "Solo en la universidad",
      "Comentarios": "ninguno",
      "Calificacion":7,
      "Roles": "Requerimientos",
      "Curriculum": "nopi"
    },
    {
      "No°": 4,
      "Empresa": "Universidad Politecnica",
      "Modalidad": "Presencial",
      "Servicio": "Estancia",
      "Proyecto": "TechHunters",
      "Fecha de inicio": "15/08/2023",
      "Fecha Fin": "23/08/2023",
      "Nombre": "Alberto Vazquez Miranda",
      "Telefono": "9681048130",
      "Correo": "211107@ids.upchipas.edu.mx",
      "Instituto": 89,
      "Cuatrimestre": "Online",
      "Estatus": "preferencias",
      "Preferencias": "ninguno",
      "Experiencias": "Solo en la universidad",
      "Comentarios": "ninguno",
      "Calificacion":5,
      "Roles": "Requerimientos",
      "Curriculum": "nopi"
    },
    {
      "No°": 5,
      "Empresa": "Universidad Politecnica",
      "Modalidad": "Presencial",
      "Servicio": "Estancia",
      "Proyecto": "TechHunters",
      "Fecha de inicio": "15/08/2023",
      "Fecha Fin": "23/08/2023",
      "Nombre": "Roberto Antonio Camacho Rodriguez",
      "Telefono": "9681048130",
      "Correo": "211107@ids.upchipas.edu.mx",
      "Instituto": 8,
      "Cuatrimestre": "Online",
      "Estatus": "preferencias",
      "Preferencias": "ninguno",
      "Experiencias": "Solo en la universidad",
      "Comentarios": "ninguno",
      "Calificacion":100,
      "Roles": "Requerimientos",
      "Curriculum": "nopi"
    },
    {
      "No°": 6,
      "Empresa": "Universidad Politecnica",
      "Modalidad": "Presencial",
      "Servicio": "Estancia",
      "Proyecto": "TechHunters",
      "Fecha de inicio": "15/08/2023",
      "Fecha Fin": "23/08/2023",
      "Nombre": "Roberto Antonio Camacho Rodriguez",
      "Telefono": "9681048130",
      "Correo": "211107@ids.upchipas.edu.mx",
      "Instituto": 8,
      "Cuatrimestre": "Online",
      "Estatus": "preferencias",
      "Preferencias": "ninguno",
      "Experiencias": "Solo en la universidad",
      "Comentarios": "ninguno",
      "Calificacion":10,
      "Roles": "Front",
      "Curriculum": "nopi"
    },
    
  ]);
  
 // Añadir una nueva propiedad 'id' a cada objeto de datos
 const dataWithIds = tableData.map((rowData, index) => ({ ...rowData, id: index }));
 
  const [searchTerm, setSearchTerm] = useState('');
  const [editRowId, setEditRowId] = useState(null);
  const [editedData, setEditedData] = useState({});
const [errorMessages, setErrorMessages] = useState({});

  const validateField = (fieldName, value) => {
    if (fieldName === 'Nombre' && value.trim() === '') {
      return 'El campo Nombre no puede estar vacío';
    }
    
    if (fieldName === 'Telefono' && value.trim() === '') {
      return 'El campo Teléfono no puede estar vacío';
    }
  
    if (fieldName === 'Telefono' && !/^[0-9]{10}$/.test(value)) {
      return 'Número de teléfono inválido';
    }
  
    if (fieldName === 'Correo' && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return 'Correo electrónico inválido';
    }
    if (fieldName === 'Estatus' && value.trim() === '') {
      return 'El campo Estatus no puede estar vacío';
    }
  
    return '';
  };

  const handleSave = (no) => {
    const fieldsToValidate = ['Telefono', 'Correo'];

    const newErrorMessages = {};

    fieldsToValidate.forEach((field) => {
      const errorMessage = validateField(field, editedData[field]);
      if (errorMessage) {
        newErrorMessages[field] = errorMessage;
      }
    });

    if (Object.keys(newErrorMessages).length > 0) {
      setErrorMessages(newErrorMessages);
      return;
    }

    setEditRowId(null);
    const updatedData = tableData.map((row) =>
      row['No°'] === no ? { ...row, ...editedData } : row
    );
    setTableData(updatedData);
    setEditedData({});
    setErrorMessages({});
  };


  const handleInputChange = (fieldName, value) => {
    const errorMessage = validateField(fieldName, value);
    setErrorMessages({ ...errorMessages, [fieldName]: errorMessage }); // Actualiza solo el mensaje de error para el campo actual
    setEditedData({ ...editedData, [fieldName]: value });
  };
  

  const handleDeleteRow = (id) => {
    const newData = tableData.filter((rowData) => rowData['No°'] !== id);
    setTableData(newData);
  };

  const handleEdit = (id) => {
    setEditRowId(id);
    const rowData = tableData.find((row) => row['No°'] === id);
    setEditedData(rowData);
  };

  const handleCancel = () => {
    setEditRowId(null);
    setEditedData({});
    setErrorMessages({});
  };

  const handleDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'DatosTalentos');
    XLSX.writeFile(workbook, 'datos_talentos.xlsx');
  };

  const filteredData = tableData.filter((rowData) =>
    Object.values(rowData).some((cellData) =>
      cellData.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  const handleDownloadCurriculum = (url) => {
    window.open(url, '_blank'); 
  };
  const searchAndSortData = () => {
    const filteredAndSortedData = tableData
      .filter((rowData) =>
        Object.values(rowData).some((cellData) =>
          cellData.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
      .sort((a, b) => b.Calificacion - a.Calificacion);

    return filteredAndSortedData;
  };

  const tableHeaders = [
    'No°', 'Empresa', 'Modalidad', 'Servicio', 'Proyecto', 'Fecha de inicio', 'Fecha Fin',
    'Nombre', 'Telefono', 'Correo', 'Instituto', 'Cuatrimestre', 'Estatus', 'Preferencias',
    'Experiencias', 'Comentarios', 'Calificacion', 'Roles', 'Curriculum', 'Acciones'
  ];

  

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg" style={{ width: '156%' }}>
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
              <li className="nav-item active ">
                <Link to="/RegistrarTalentos" className="nav-link nav-link-lg font-weight-bold">Registrar Talentos</Link>
              </li>
              <li className="nav-item">
                <Link to="/DatosTalentos" className="nav-link nav-link-black nav-link-lg font-weight-bold">Registros</Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="enterede-buttones btn-bg-boton-reg text-white">
                  Cerrar Sesion
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav><br />

      
      <div className="d-flex align-items-center">
        <div className="form-outline">
          <input
            type="search"
            placeholder='Buscar'
            id="form1"
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary ml-2">
          <FontAwesomeIcon icon={faSearch} />
        </button>
        <button className="btn btn-success ml-2" onClick={handleDownload}>
          Descargar Excel
        </button>
      </div><br />

      {/* Table */}
      <table id="registro" className="table table-striped table-bordered">
        <thead>
          <tr>
            {tableHeaders.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {searchAndSortData().map((rowData) => (
            <tr key={rowData['No°']}>
              {tableHeaders.map((header) => (
                <td key={header}>
                  {header === 'Curriculum' ? (
                    <div>
                      <a
                        href={rowData[header]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-info btn-sm mr-2"
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </a>
                      <a
                        href={rowData[header]}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="btn btn-success btn-sm"
                      >
                        <FontAwesomeIcon icon={faDownload} />
                      </a>
                    </div>
                  ) : (
                    header === 'Acciones' ? (
                      <div>
                        {editRowId === rowData['No°'] ? (
                          <div>
                            <button
                              className="btn btn-success btn-sm mr-2"
                              onClick={() => handleSave(rowData['No°'])}
                            >
                              <FontAwesomeIcon icon={faSave} />
                            </button>
                            <button
                              className="btn btn-secondary btn-sm"
                              onClick={handleCancel}
                            >
                              <FontAwesomeIcon icon={faTimes} />
                            </button>
                          </div>
                        ) : (
                          <div>
                            <button
                              className="btn btn-danger btn-sm mr-2"
                              onClick={() => handleDeleteRow(rowData['No°'])}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => handleEdit(rowData['No°'])}
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        {editRowId === rowData['No°'] ? (
                          <input
                            type="text"
                            value={editedData[header] || ''}
                            onChange={(e) => handleInputChange(header, e.target.value)}
                            className="form-control"
                          />
                        ) : (
                          <div>{rowData[header]}</div>
                        )}
                        {errorMessages[header] && editRowId === rowData['No°'] && (
                          <div className="text-danger">{errorMessages[header]}</div>
                        )}
                      </div>
                    )
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};