import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }
    register({ name, email, password });
    alert('Inscription réussie ! Redirection vers la page de connexion.');
    navigate('/login');
  };

  return (
    <main style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nom"
          required
          style={{ padding: '8px', marginBottom: '10px' }}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          style={{ padding: '8px', marginBottom: '10px' }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          required
          style={{ padding: '8px', marginBottom: '10px' }}
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirmer le mot de passe"
          required
          style={{ padding: '8px', marginBottom: '10px' }}
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
          S'inscrire
        </button>
      </form>
    </main>
  );
}

export default RegisterPage;