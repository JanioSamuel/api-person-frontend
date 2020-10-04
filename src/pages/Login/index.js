import React, { useState } from 'react';

import api from '../../services/api';

import './styles.css';

export default function Login({ history }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.post('/login', {}, {
        headers: {
          Authorization: "Basic " + btoa(login + ":" + password)
        }
      });
      if (response.data === true) {
        localStorage.setItem('auth', btoa(login + ":" + password));
        history.push('/list')
      }
    } catch (err) {
      alert('Unauthorized');
    }

  }
  return (
    <>
      <div className="container">
        <label className="login-label">Login</label>
        <form className="form-login" onSubmit={handleSubmit}>
          <input type="text"
            placeholder="login"
            value={login}
            onChange={event => setLogin(event.target.value)}
          />
          <input type="password"
            placeholder="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
          <button className="btn" type="submit">Login</button>
        </form>
      </div>
    </>
  )
}