import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';
import './styles.css';

export default function Navbar() {

  const history = useHistory();

  async function handleLogout() {
    const auth = localStorage.getItem('auth');
    await api.post('/logout', {}, {
      headers: {
        Authorization: "Basic " + auth
      }
    });

    localStorage.setItem('auth', null);

    history.push("/");
  }
  return (
    <>
      <Link to="/" style={{ textDecoration: 'none' }} >
        <div className="header">
          <label style={{ cursor: 'pointer' }}>PERSON API</label>
        </div>
      </Link>
      <div className="menu-links">
        <Link to="/list" style={{ textDecoration: 'none' }}>
          <label>PEOPLE LIST</label>
        </Link>
        <Link to="/form" style={{ textDecoration: 'none' }}>
          <label>REGISTER PERSON</label>
        </Link>
        <a href={process.env.NODE_ENV === 'development' ? 'http://localhost:8080/swagger-ui.html' : 'https://api-person-backend.herokuapp.com/swagger-ui.html'}
          target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
          <label>DOCS</label>
        </a>
        <a href="https://github.com/JanioSamuel/api-person-frontend" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
          <label>GITHUB FRONTEND</label>
        </a>
        <a href="https://github.com/JanioSamuel/api-person-backend" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
          <label>GITHUB BACKEND</label>
        </a>
        <label onClick={handleLogout}>LOGOUT</label>
      </div>
    </>
  )
}