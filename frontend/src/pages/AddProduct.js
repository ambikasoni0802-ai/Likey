import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function AddProduct() {
  const [form, setForm] = useState({
    name: '', description: '', price: '', image: '', category: '', stock: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await api.post('/products', {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock)
      });
      setSuccess('Product add ho gaya!');
      setForm({ name: '', description: '', price: '', image: '', category: '', stock: '' });
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      setError(err.response?.data?.message || 'Kuch galat ho gaya');
    }
  };

  return (
    <div className="form-box">
      <h2>Naya Product Add Karo</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Product Naam" value={form.name} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input name="price" type="number" placeholder="Price (₹)" value={form.price} onChange={handleChange} required />
        <input name="image" placeholder="Image URL (optional)" value={form.image} onChange={handleChange} />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
        <input name="stock" type="number" placeholder="Stock quantity" value={form.stock} onChange={handleChange} required />
        <button className="btn" type="submit" style={{ width: '100%' }}>Product Add Karo</button>
      </form>
    </div>
  );
    }
        
