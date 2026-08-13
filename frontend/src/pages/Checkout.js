import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { CartContext } from '../context/CartContext';

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleOrder = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const products = cart.map((item) => ({
        product: item.product._id,
        quantity: item.quantity
      }));

      await api.post('/orders', {
        products,
        totalAmount: total,
        shippingAddress: address,
        phone
      });

      setSuccess('Order place ho gaya!');
      clearCart();
      setTimeout(() => navigate('/my-orders'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Order fail ho gaya');
    }
  };

  return (
    <div className="form-box">
      <h2>Checkout</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <p style={{ marginBottom: '10px' }}>Total: ₹{total}</p>
      <form onSubmit={handleOrder}>
        <textarea
          placeholder="Delivery Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <button className="btn" type="submit" style={{ width: '100%' }}>Place Order</button>
      </form>
    </div>
  );
}
