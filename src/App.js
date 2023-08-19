
import './App.css';
import {Route,Routes,BrowserRouter} from 'react-router-dom';
import {Inicio} from './paginas/Inicio.js';
import {RegistrarTalentos} from './paginas/RegistrarTalentos';
import {DatosTalentos} from './paginas/DatosTalentos';
import {RegistroSesion} from './paginas/RegistroSesion';
import {Present} from './paginas/Present.js';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
     
      <Routes>
        <Route path='/' element={<Inicio/>}/>
        <Route path='/registrarTalentos' element={<RegistrarTalentos/>}/>
       
        <Route path='/datosTalentos' element={<DatosTalentos/>}/>
        <Route path='/registroSesion' element={<RegistroSesion/>}/>
        <Route path='/present' element={<Present/>}/>
        
       
        </Routes>
        </BrowserRouter>
     
        
    </div>
  );
}

export default App;
