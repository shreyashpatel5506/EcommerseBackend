import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { useState } from 'react';
import Navbar from './component/Navbar';
import About from './component/About';
import Home from './component/Home'; // Ensure consistent case for filenames
import NoteState from './context/notes/notestate';
import Alert from './component/Alert';
import Login from './component/login'; // Use lowercase for filenames
import Signup from './component/signup'; // Use uppercase for component names
import { useEffect } from 'react';


function App() {
  const [alert, setAlert] = useState()
  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }
  
 
  return (
    <NoteState>
      <Router>
        <Navbar />
        <Alert alert={alert}/>
        <div className='container'>
          <Routes>
            <Route path='/about' element={<About />} />
            <Route path='/home' element={<Home showAlert={showAlert}/>} />
            <Route path='/' element={<Home showAlert={showAlert} />} />
            <Route path='/login' element={<Login showAlert={showAlert}/>} /> {/* Corrected component name */}
            <Route path='/signup' element={<Signup showAlert={showAlert}/>} /> {/* Corrected component name */}
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;