import './App.css';
import {React} from 'react';

import Register from '../src/components/register/Register';
import Login from './components/login/Login';
import About from './components/about/About';
import Dashboard from './components/dashboard/users/Dashboard';
import AdminDashboard from './components/dashboard/admin/AdminDashboard';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <nav>
      <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="about" element={<About/>} />
          <Route path="register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </nav>
  );
}

export default App;
