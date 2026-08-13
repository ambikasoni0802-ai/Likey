import React, { useEffect, useState } from 'react';
import api from '../api';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/orders/my-orders')
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <h2 style={{ marginBottom: '15px' }}>My Orders</h2>
      {orders.length === 0 ? (
        <p>Koi order nahi hai abhi tak.</p>
      ) : (
        orders.map((order) => (
          <div className="cart-item" key={order._id} style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Total:</strong> ₹{order.totalAmount}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Address:</strong> {order.shippingAddress}</p>
          </div>
        ))
      )}
    </div>
  );
}
