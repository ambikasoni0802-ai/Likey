import React, { useEffect, useState } from 'react';
import api from '../api';

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadProducts = () => {
    api.get('/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id, name) => {
    const confirmDelete = window.confirm(`Kya tum "${name}" ko delete karna chahte ho?`);
    if (!confirmDelete) return;

    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Delete nahi ho paya');
    }
  };

  if (loading) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <h2 className="section-title">Products Manage Karo</h2>
      {error && <p className="error">{error}</p>}
      {products.length === 0 ? (
        <div className="empty-state">
          <p>Abhi koi product nahi hai.</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Naam</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>
                  <img
                    src={p.image || 'https://via.placeholder.com/50'}
                    alt={p.name}
                    style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                  />
                </td>
                <td>{p.name}</td>
                <td>₹{p.price}</td>
                <td>{p.stock}</td>
                <td>
                  <button
                    className="btn"
                    style={{ background: '#ff6161' }}
                    onClick={() => handleDelete(p._id, p.name)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

