import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || '';

  useEffect(() => {
    api.get('/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = searchTerm
    ? products.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.category && p.category.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : products;

  if (loading) return <div className="container">Loading...</div>;

  return (
    <>
      <div className="banner">
        <h1>Big Shopping Days</h1>
        <p>Best deals on your favorite products — sirf MyShop par</p>
      </div>
      <div className="container">
        <h2 className="section-title">
          {searchTerm ? `Search results for "${searchTerm}"` : 'All Products'}
        </h2>
        {filteredProducts.length === 0 ? (
          <div className="empty-state">
            <p>{searchTerm ? 'Koi product nahi mila.' : 'Abhi koi product nahi hai. Admin panel se product add karo.'}</p>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
