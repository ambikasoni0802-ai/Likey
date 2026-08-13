import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', address: '', phone: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/auth/signup', form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Kuch galat ho gaya');
    }
  };

  return (
    <div className="form-box">
      <h2>Signup</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Naam" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <input name="address" placeholder="Address" onChange={handleChange} required />
        <input name="phone" placeholder="Phone" onChange={handleChange} required />
        <button className="btn" type="submit" style={{ width: '100%' }}>Signup</button>
      </form>
      <p style={{ marginTop: '10px' }}>Pehle se account hai? <Link to="/login">Login karo</Link></p>
    </div>
  );
}
