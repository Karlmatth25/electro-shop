import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './ProductCard.css';

function ProductCard({ id, name, price, description, image }) {
  const { addItem } = useContext(CartContext);
  const priceInXOF = (price * 655.957).toFixed(2);

  const handleAddToCart = () => {
    addItem({ id, name, price: parseFloat(priceInXOF), description, image });
  };

  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-image" loading="lazy" />
      <h3>{name}</h3>
      <p className="description">{description}</p>
      <p className="price">{priceInXOF} XOF</p>
      <button onClick={handleAddToCart} className="add-to-cart">
        Ajouter au panier
      </button>
    </div>
  );
}

export default ProductCard;