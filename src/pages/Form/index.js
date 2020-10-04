import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar';

import api from '../../services/api';
import './styles.css';

export default function Form({ history }) {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('MALE');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [placeBirth, setPlaceBirth] = useState('');
  const [citizenship, setCitizenship] = useState('');
  const [taxpayerId, setTaxpayerId] = useState('');
  const [createdAt, setCreatedAt] = useState(null);
  const [id, setId] = useState(null);

  const locationState = useLocation().state;
  const auth = localStorage.getItem('auth');
  useEffect(() => {
    if (auth === 'null') {
      history.push("/unauthorized");
    }
    if (locationState) {
      async function loadPerson() {
        setId(() => locationState.id);
        setName(() => locationState.name);
        setGender(() => locationState.gender);
        setEmail(() => locationState.email);
        setBirthDate(() => locationState.birthDate);
        setPlaceBirth(() => locationState.placeBirth || '');
        setCitizenship(() => locationState.citizenship || '');
        setTaxpayerId(() => locationState.taxpayerId);
        setCreatedAt(() => locationState.createdAt);
      };
      loadPerson();
    }
  }, [history, auth, locationState]);
  async function handleSubmit(event) {
    event.preventDefault();

    const params = {
      name: name,
      gender: gender,
      email: email,
      birthDate: birthDate,
      placeBirth: placeBirth,
      citizenship: citizenship,
      taxpayerId: taxpayerId
    }

    const headers = {
      headers: {
        Authorization: "Basic " + auth
      }
    }
    if (locationState) {
      try {
        params.id = id;
        params.createdAt = createdAt;
        await api.put('/person', params, headers);
        alert('Successfully updated');
        window.location.reload();
      } catch (err) {
        const keys = err.response.data;
        alert(Object.keys(keys).map(key => `* ${keys[key]} \n `));
      }
    } else {
      try {
        await api.post('/person', params, headers);
        alert('Successfully created');
        window.location.reload();
      } catch (err) {
        const keys = err.response.data;
        alert(Object.keys(keys).map(key => `* ${keys[key]} \n `));
      }
    }
  }
  return (
    <>
      <Navbar />
      <div className="container">
        <label className="register-label">Register Person</label>
        <form className="form-register" onSubmit={handleSubmit}>
          <input type="text"
            placeholder="Name *"
            value={name}
            onChange={e => setName(e.target.value)}
            required={true}
          />
          <select name="gender" onChange={e => setGender(e.target.value)}>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
          <input type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input type="date"
            placeholder="Birth Date *"
            value={birthDate}
            required={true}
            onChange={e => setBirthDate(e.target.value)}
          />
          <input type="text"
            placeholder="Place of Birth"
            value={placeBirth}
            onChange={e => setPlaceBirth(e.target.value)}
          />
          <input type="text"
            placeholder="Citizenship"
            value={citizenship}
            onChange={e => setCitizenship(e.target.value)}
          />
          <input type="number"
            placeholder="Taxpayer ID *"
            value={taxpayerId}
            required={true}
            onChange={e => setTaxpayerId(e.target.value)}
          />
          <button className="btn-form " type="submit">{locationState ? 'Update' : 'Register'}</button>
        </form>
      </div>
    </>
  )
}