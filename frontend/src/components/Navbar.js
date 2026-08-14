import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${encodeURIComponent(search)}`);
  };

  return (
    <div className="navbar">
      <Link to="/" className="logo">
        MyShop
        <span className="tagline">Explore Plus</span>
      </Link>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for products, brands and more"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">🔍</button>
      </form>

      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart ({cart.length})</Link>
        {user ? (
          <>
            <Link to="/my-orders">My Orders</Link>
            {user.role === 'admin' && <Link to="/admin">Admin</Link>}
            {user.role === 'admin' && <Link to="/add-product">Add Product</Link>}
            {user.role === 'admin' && <Link to="/manage-products">Manage Products</Link>}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup" className="signup-btn">Signup</Link>
          </>
        )}
      </div>
    </div>
  );
          }
             
