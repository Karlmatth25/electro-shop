import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';
import PaymentPage from './pages/PaymentPage';
import WelcomePage from './pages/WelcomePage';
import Footer from './components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome, faShoppingCart, faEnvelope, faSignInAlt, faUserPlus, faUserShield, faAdjust } from '@fortawesome/free-solid-svg-icons';
import { Particles } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import './App.css';

function AppContent() {
  const [showAnimation, setShowAnimation] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true); // Toggle thème
  const location = useLocation();

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  return (
    <div className={`app-container ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      <Particles
        init={async (engine) => {
          await loadSlim(engine);
        }}
        options={{
          particles: {
            number: { value: 50 },
            color: { value: ['#00D1FF', '#8B00FF'] },
            size: { value: 3 },
            move: { enable: true, speed: 2 },
            links: { enable: true, color: '#00D1FF' }
          },
          interactivity: {
            events: { onHover: { enable: true, mode: 'repulse' } }
          }
        }}
      />
      <button className="toggle-sidebar" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        <FontAwesomeIcon icon={faBars} className="icon-neon" />
      </button>
      <button className="theme-toggle" onClick={() => setIsDarkTheme(!isDarkTheme)}>
        <FontAwesomeIcon icon={faAdjust} className="icon-neon" />
      </button>
      <aside className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
        <nav>
          <ul>
            <li className={location.pathname === '/' ? 'active' : ''}>
              <Link to="/" onClick={() => setIsSidebarOpen(false)} className="sidebar-link">
                <FontAwesomeIcon icon={faHome} className="icon-neon" /> Accueil
              </Link>
            </li>
            <li className={location.pathname === '/products' ? 'active' : ''}>
              <Link to="/products" onClick={() => setIsSidebarOpen(false)} className="sidebar-link">
                <FontAwesomeIcon icon={faShoppingCart} className="icon-neon" /> Produits
              </Link>
            </li>
            <li className={location.pathname === '/cart' ? 'active' : ''}>
              <Link to="/cart" onClick={() => setIsSidebarOpen(false)} className="sidebar-link">
                <FontAwesomeIcon icon={faShoppingCart} className="icon-neon" /> Panier
              </Link>
            </li>
            <li className={location.pathname === '/contact' ? 'active' : ''}>
              <Link to="/contact" onClick={() => setIsSidebarOpen(false)} className="sidebar-link">
                <FontAwesomeIcon icon={faEnvelope} className="icon-neon" /> Contact
              </Link>
            </li>
            <li className={location.pathname === '/login' ? 'active' : ''}>
              <Link to="/login" onClick={() => setIsSidebarOpen(false)} className="sidebar-link">
                <FontAwesomeIcon icon={faSignInAlt} className="icon-neon" /> Login
              </Link>
            </li>
            <li className={location.pathname === '/register' ? 'active' : ''}>
              <Link to="/register" onClick={() => setIsSidebarOpen(false)} className="sidebar-link">
                <FontAwesomeIcon icon={faUserPlus} className="icon-neon" /> Inscription
              </Link>
            </li>
            <li className={location.pathname === '/admin' ? 'active' : ''}>
              <Link to="/admin" onClick={() => setIsSidebarOpen(false)} className="sidebar-link">
                <FontAwesomeIcon icon={faUserShield} className="icon-neon" /> Admin
              </Link>
            </li>
            <li className={location.pathname === '/welcome' ? 'active' : ''}>
              <Link to="/welcome" onClick={() => setIsSidebarOpen(false)} className="sidebar-link">
                <FontAwesomeIcon icon={faHome} className="icon-neon" /> Bienvenue
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/payment/:method" element={<PaymentPage />} />
          <Route path="/welcome" element={<WelcomePage />} />
        </Routes>
        <Footer />
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;