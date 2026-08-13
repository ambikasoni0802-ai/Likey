import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

export default function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div className="container">
      <h2 style={{ marginBottom: '15px' }}>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Cart khaali hai.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-item" key={item.product._id}>
              <div>
                <strong>{item.product.name}</strong>
                <p>Qty: {item.quantity} x ₹{item.product.price}</p>
              </div>
              <button className="btn" onClick={() => removeFromCart(item.product._id)}>Remove</button>
            </div>
          ))}
          <h3 style={{ margin: '15px 0' }}>Total: ₹{total}</h3>
          <button className="btn" onClick={handleCheckout}>Checkout karo</button>
        </>
      )}
    </div>
  );
}
