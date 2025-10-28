import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import products from '../data/products';
import './ProductListPage.css';

function ProductListPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(products.map(p => p.category))];

  return (
    <main className="product-list-page">
      <div className="filter-section">
        <input
          type="text"
          placeholder="Rechercher un produit..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="filter-group">
          <span>Filtrer par :</span>
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="category-select"
          >
            <option value="all">Toutes catégories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="no-results">
          <p>Aucun produit ne correspond à votre recherche</p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setCategoryFilter('all');
            }}
            className="reset-button"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}
    </main>
  );
}

export default ProductListPage;