import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext'; // Import nommé

function Header() {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  return (
    <header style={{ 
      backgroundColor: '#333', 
      padding: '10px 20px', 
      color: 'white' 
    }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Link to="/" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>Accueil</Link>
          <Link to="/products" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>Produits</Link>
          <Link to="/cart" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>
            Panier ({cart.length})
          </Link>
          <Link to="/contact" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>Contact</Link>
          {!user && (
            <>
              <Link to="/login" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>Connexion</Link>
              <Link to="/register" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>Inscription</Link>
            </>
          )}
          {user && user.role === 'admin' && (
            <Link to="/admin" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>Admin</Link>
          )}
          {user && (
            <button onClick={logout} style={{ color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}>
              Déconnexion
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;