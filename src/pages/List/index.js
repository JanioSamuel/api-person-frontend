import React, { useEffect, useState } from 'react';

import api from '../../services/api';
import editImage from '../../assets/edit.png';

import './styles.css';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';

export default function List({ history }) {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    async function loadPeople() {

      const auth = localStorage.getItem('auth');
      try {
        const response = await api.get('/person', {
          headers: {
            Authorization: "Basic " + auth
          }
        });
        setPeople(() => response.data);
      } catch (err) {
        if (err.response.status === 401) {
          history.push("/unauthorized");
        }
      }
    };
    loadPeople();
  }, [history]);

  async function handleEdit(e) {
    history.push({
      pathname: '/form',
      state: e
    })
  }
  return (
    <>
      <Navbar />
      <div className="container">
        <Link to="/form">
          <button className="btn-new">New</button>
        </Link>
        <table>
          <thead></thead>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>E-mail</th>
              <th>Birth Date</th>
              <th>Place of Birth</th>
              <th>Citizenship</th>
              <th>Taxpayer ID</th>
              <th>Option</th>
            </tr>
            {people.map(person => (
              <tr key={person.id}>
                <td>{person.name}</td>
                <td>{person.gender}</td>
                <td>{person.email}</td>
                <td>{person.birthDate}</td>
                <td>{person.placeBirth}</td>
                <td>{person.citizenship}</td>
                <td>{person.taxpayerId}</td>
                <td><img src={editImage} alt="edit" title="edit" onClick={() => handleEdit(person)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}