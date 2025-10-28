import React, { useState } from 'react';

function MobileMoneyCheckout({ cartTotal, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState('mtn'); // Par défaut MTN
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleCheckout = async () => {
    if (!email || !phone) {
      alert('Veuillez entrer votre email et numéro de téléphone');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: cartTotal, currency: 'XOF', method, email, phone }),
      });
      const { paymentUrl } = await response.json();
      if (paymentUrl) {
        window.location.href = paymentUrl; // Redirige vers la page de paiement Flutterwave
      } else {
        throw new Error('Erreur lors de la génération du lien de paiement');
      }
    } catch (error) {
      console.error('Error:', error);
      onSuccess(); // Simule un succès ou gère l'erreur
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <input
        type="email"
        placeholder="Votre email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: '5px', marginBottom: '10px', display: 'block' }}
      />
      <input
        type="tel"
        placeholder="Votre numéro de téléphone (ex: +22812345678)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ padding: '5px', marginBottom: '10px', display: 'block' }}
      />
      <select value={method} onChange={(e) => setMethod(e.target.value)} style={{ padding: '5px', marginRight: '10px' }}>
        <option value="mtn">MTN Mobile Money</option>
        <option value="tmoney">TMoney (Flooz)</option>
      </select>
      <button
        onClick={handleCheckout}
        style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}
        disabled={loading}
      >
        {loading ? 'Traitement...' : `Payer ${cartTotal.toFixed(2)} XOF`}
      </button>
    </div>
  );
}

export default MobileMoneyCheckout;