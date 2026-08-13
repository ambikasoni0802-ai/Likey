import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`}>
        <img src={product.image || 'https://via.placeholder.com/150'} alt={product.name} />
        <h3>{product.name}</h3>
      </Link>
      <div className="price">₹{product.price}</div>
      <button className="btn" onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}
