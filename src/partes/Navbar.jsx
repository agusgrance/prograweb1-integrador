import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function  Navbar() {

  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

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

  const logout = function () {
    if (window.confirm('¿Estás seguro de querer salir del sistema?')) {
      localStorage.removeItem('token');
      window.dispatchEvent(new Event('storage'));
    }
  }

  return token && (
     <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">MiApp</NavLink>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="listado">Listado de usuarios</NavLink>
            </li>
            <li className="nav-item">
              <button type="button" className="btn btn-secondary" onClick={() => logout()}>Log-out</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
