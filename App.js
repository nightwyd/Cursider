// App.js - Main application component
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AdminOrders from './pages/admin/Orders';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

// components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUserCircle, FaSearch } from 'react-icons/fa';

const Navbar = () => {
  const [searchQuery, SetSearchQuery] = useState('');
  
  const HandleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
  };
  
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <h1>Cursider Scripts</h1>
        </Link>
      </div>
      
      <form className="search-form" onSubmit={HandleSearch}>
        <input
          type="text"
          placeholder="Search scripts, UI kits, modules..."
          value={searchQuery}
          onChange={(e) => SetSearchQuery(e.target.value)}
        />
        <button type="submit">
          <FaSearch />
        </button>
      </form>
      
      <div className="nav-links">
        <Link to="/cart" className="cart-icon">
          <FaShoppingCart />
          <span className="cart-count">0</span>
        </Link>
        <Link to="/login" className="user-icon">
          <FaUserCircle />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

// pages/HomePage.js
import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import api from '../services/api';

const HomePage = () => {
  const [products, SetProducts] = useState([]);
  const [categories, SetCategories] = useState([]);
  const [loading, SetLoading] = useState(true);
  const [selectedCategory, SetSelectedCategory] = useState('all');
  
  useEffect(() => {
    const FetchData = async () => {
      try {
        const productsResponse = await api.get('/products');
        const categoriesResponse = await api.get('/categories');
        
        SetProducts(productsResponse.data);
        SetCategories(categoriesResponse.data);
        SetLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        SetLoading(false);
      }
    };
    
    FetchData();
  }, []);
  
  const FilteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);
  
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Premium Roblox Scripts & Assets</h1>
          <p>Enhance your Roblox games with professional scripts and assets</p>
          <button className="cta-button">Browse Collection</button>
        </div>
      </section>
      
      <section className="featured-products">
        <h2>Featured Products</h2>
        <CategoryFilter 
          categories={categories} 
          selectedCategory={selectedCategory}
          onSelectCategory={SetSelectedCategory} 
        />
        
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          <div className="products-grid">
            {FilteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;

// components/ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <div className="product-image">
          <img src={product.imageUrl} alt={product.name} />
        </div>
        <div className="product-info">
          <h3>{product.name}</h3>
          <div className="product-rating">
            {[...Array(5)].map((_, i) => (
              <FaStar 
                key={i} 
                className={i < Math.floor(product.rating) ? 'star-filled' : 'star-empty'} 
              />
            ))}
            <span>({product.reviewCount})</span>
          </div>
          <p className="product-description">{product.shortDescription}</p>
          <div className="product-price">${product.price.toFixed(2)}</div>
        </div>
      </Link>
      <button className="add-to-cart-btn">Add to Cart</button>
    </div>
  );
};

export default ProductCard;

// pages/admin/Products.js - Admin Panel for Products
import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import api from '../../services/api';
import AdminSidebar from '../../components/AdminSidebar';
import ProductForm from '../../components/ProductForm';

const AdminProducts = () => {
  const [products, SetProducts] = useState([]);
  const [loading, SetLoading] = useState(true);
  const [showForm, SetShowForm] = useState(false);
  const [currentProduct, SetCurrentProduct] = useState(null);
  
  useEffect(() => {
    FetchProducts();
  }, []);
  
  const FetchProducts = async () => {
    try {
      const response = await api.get('/admin/products');
      SetProducts(response.data);
      SetLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      SetLoading(false);
    }
  };
  
  const HandleAddNew = () => {
    SetCurrentProduct(null);
    SetShowForm(true);
  };
  
  const HandleEdit = (product) => {
    SetCurrentProduct(product);
    SetShowForm(true);
  };
  
  const HandleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/admin/products/${id}`);
        FetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };
  
  const HandleFormSubmit = async (formData) => {
    try {
      if (currentProduct) {
        // Update existing product
        await api.put(`/admin/products/${currentProduct.id}`, formData);
      } else {
        // Create new product
        await api.post('/admin/products', formData);
      }
      
      SetShowForm(false);
      FetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };
  
  return (
    <div className="admin-page">
      <AdminSidebar />
      <div className="admin-content">
        <div className="admin-header">
          <h1>Manage Products</h1>
          <button className="add-new-btn" onClick={HandleAddNew}>
            <FaPlus /> Add New Product
          </button>
        </div>
        
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="product-thumbnail" 
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>${product.price.toFixed(2)}</td>
                    <td>
                      <span className={`status-badge ${product.active ? 'active' : 'inactive'}`}>
                        {product.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="action-buttons">
                      <button 
                        className="edit-btn" 
                        onClick={() => HandleEdit(product)}
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="delete-btn" 
                        onClick={() => HandleDelete(product.id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {showForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <ProductForm 
                product={currentProduct} 
                onSubmit={HandleFormSubmit} 
                onCancel={() => SetShowForm(false)} 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
