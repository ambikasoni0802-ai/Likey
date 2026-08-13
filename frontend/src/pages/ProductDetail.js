import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import { CartContext } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    api.get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <div className="product-card" style={{ maxWidth: '400px' }}>
        <img src={product.image || 'https://via.placeholder.com/200'} alt={product.name} />
        <h2>{product.name}</h2>
        <p style={{ margin: '10px 0' }}>{product.description}</p>
        <div className="price">₹{product.price}</div>
        <button className="btn" onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    </div>
  );
}
