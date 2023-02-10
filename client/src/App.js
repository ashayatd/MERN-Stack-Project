import './App.css';
import {React} from 'react';

import Register from './components/Register';
import Login from './components/Login';
import About from './components/About';
import Dashboard from './components/Dashboard';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <nav>
      <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="about" element={<About/>} />
          <Route path="register" element={<Register />} />
          <Route path="dashboard/dashboard" element={<Dashboard />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        
      </Routes>
    </nav>
  );
}

export default App;
