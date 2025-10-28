import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext'; // Import pour utiliser cart

function AdminPage() {
  const { cart } = useContext(CartContext); // Utilise cart
  const [products, setProducts] = useState([
    { id: 1, name: 'Produit 1', price: 100, description: 'Description 1' },
    { id: 2, name: 'Produit 2', price: 200, description: 'Description 2' },
  ]);
  const [orders, setOrders] = useState([]); // Utilise setOrders
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '' });

  const handleAddProduct = (e) => {
    e.preventDefault();
    setProducts([...products, { ...newProduct, id: Date.now(), price: parseFloat(newProduct.price) }]);
    setNewProduct({ name: '', price: '', description: '' });
  };

  // Affichage simple de cart et orders pour éviter les avertissements
  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2>Page Admin</h2>
      <h3>Contenu du panier (info)</h3>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>{item.name} - {item.quantity} unité(s)</li>
        ))}
      </ul>
      <h3>Commandes</h3>
      <ul>
        {orders.map((order, index) => (
          <li key={index}>{JSON.stringify(order)}</li>
        ))}
      </ul>
      <h3>Gérer les produits</h3>
      <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          placeholder="Nom du produit"
          required
        />
        <input
          type="number"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          placeholder="Prix"
          required
        />
        <input
          type="text"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          placeholder="Description"
          required
        />
        <button type="submit">Ajouter produit</button>
      </form>
      <h3>Liste des produits</h3>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name} - {product.price}€ - {product.description}</li>
        ))}
      </ul>
    </main>
  );
}

export default AdminPage;