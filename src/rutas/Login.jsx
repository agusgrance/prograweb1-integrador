import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Login () {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Redirección cuando el usuario está logueado
    if (token!=null) {
      navigate("/contacto");
    }
  }, []);

  const actualizarEmail = (e) => {
    setEmail(e.target.value);
    setError(null);
  };

  const actualizarPassword = (e) => {
    setPassword(e.target.value);
    setError(null);
  };

  const enviar = () => {
    const credenciales = {
      email: email,
      password: password,
    }
    axios.post('login', credenciales)
      .then(async response => {
        localStorage.setItem('token', response.data.token);
        window.dispatchEvent(new Event('storage'));
        navigate('/listado');
      })
      .catch(error => {
        setError(error.response.data.error);
      });
  }
  
  const popular = () => {
    setEmail('super@admin.com');
    setPassword('abc123');
  }

  return (
    <main className="form-signin w-100 m-auto text-center mt-5">
      <form>
        <h1 className="h3 mb-3 fw-normal">Acceso al sistema</h1>
        <div className="form-floating">
          <input type="email" className="form-control" id="email" name="email" placeholder="Email" required onChange={actualizarEmail}/>
          <label htmlFor="email">Email</label>
        </div>
        <div className="form-floating">
          <input type="password" className="form-control" id="password" name="password" placeholder="Password" required onChange={actualizarPassword}/>
          <label htmlFor="password" className="form-label">Password</label>
        </div>
        <button type="button" className="w-100 btn btn-lg btn-primary" onClick={enviar}>
          Submit
        </button>
        { error && (<div className="text-danger">Las credenciales son incorrectas</div>)}
        <p className="mt-5 mb-3 text-muted" onClick={popular}>Programación Web II</p>
      </form>
    </main>
  );
}

export default Login;
