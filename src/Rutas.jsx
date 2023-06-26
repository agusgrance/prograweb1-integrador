import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Listado from './rutas/Listado';
import Login from './rutas/Login';

function Rutas () {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token'));
    };

    // Escucha los cambios en el almacenamiento local
    window.addEventListener('storage', handleStorageChange);

    // Limpia el evento cuando el componente se desmonta
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={token ? <Listado /> : <Login />} />
      <Route path="listado" element={token ? <Listado /> : <Navigate to="/" replace />} />
    </Routes>
  );
}

export default Rutas;