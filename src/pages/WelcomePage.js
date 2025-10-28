import React from 'react';
import './WelcomePage.css';

function WelcomePage() {
  const handleStart = () => {
    alert('Allons-y !');
  };

  return (
    <main className="welcome-page">
      <h1 className="title">Page de Bienvenue</h1>
      <p className="message">Bienvenue sur My Electro Shop Togo ! Découvrez nos offres exclusives.</p>
      <button className="start-button" onClick={handleStart}>Entrer dans le futur</button>
    </main>
  );
}

export default WelcomePage;