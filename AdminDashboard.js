import React, { useEffect, useState } from 'react';
import api from '../api';

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = () => {
    api.get('/orders')
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/orders/${id}/status`, { status });
      loadOrders();
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <h2 style={{ marginBottom: '15px' }}>Admin - Sabhi Orders</h2>
      {orders.length === 0 ? (
        <p>Koi order nahi hai abhi tak.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Customer Naam</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.user?.name}</td>
                <td>{order.user?.email}</td>
                <td>{order.phone}</td>
                <td>{order.shippingAddress}</td>
                <td>₹{order.totalAmount}</td>
                <td>
                  <select
                    className="status-select"
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
