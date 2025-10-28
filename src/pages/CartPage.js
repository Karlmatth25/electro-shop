import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import MobileMoneyCheckout from '../components/MobileMoneyCheckout';
import emailjs from 'emailjs-com';

function CartPage() {
  const { cart, cartTotal, updateQuantity, removeItem, clearCart } = useContext(CartContext);

  const handlePaymentSuccess = () => {
    clearCart();
    alert('Paiement effectué avec succès !');

    // Envoi d'email de confirmation
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID; // Crée un template spécifique si besoin
    const userId = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    if (serviceId && templateId && userId) {
      const cartDetails = cart.map(item => `${item.name} x${item.quantity} = ${(item.price * item.quantity).toFixed(2)} €`).join('\n');
      emailjs.send(serviceId, templateId, {
        to_email: process.env.REACT_APP_ADMIN_EMAIL || 'tonemail@gmail.com', // Ajoute REACT_APP_ADMIN_EMAIL dans .env.local
        subject: 'Confirmation de commande - MyElectroShop',
        message: `Merci pour votre commande !\nDétails :\n${cartDetails}\nTotal : ${cartTotal.toFixed(2)} €`,
      }, userId).then(() => {
        console.log('Email de confirmation envoyé.');
      }).catch((error) => {
        console.error('Erreur EmailJS:', error);
      });
    }
  };

  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ marginBottom: '30px' }}>Votre Panier</h2>
      {cart.length === 0 ? (
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '18px', marginBottom: '20px' }}>Votre panier est vide</p>
          <Link to="/products" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
            Voir nos produits
          </Link>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: '30px' }}>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #eee', gap: '20px' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: 0 }}>{item.name}</h3>
                  <p style={{ color: '#666', margin: '5px 0' }}>{item.description}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ padding: '5px 10px', border: '1px solid #ddd', backgroundColor: '#f8f9fa', cursor: 'pointer' }}>-</button>
                    <span style={{ padding: '0 10px', minWidth: '30px', textAlign: 'center' }}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ padding: '5px 10px', border: '1px solid #ddd', backgroundColor: '#f8f9fa', cursor: 'pointer' }}>+</button>
                  </div>
                  <p style={{ fontWeight: 'bold', minWidth: '80px', textAlign: 'right' }}>{(item.price * item.quantity).toFixed(2)} €</p>
                  <button onClick={() => removeItem(item.id)} style={{ padding: '5px', background: 'none', border: 'none', color: 'red', cursor: 'pointer' }} title="Supprimer">×</button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'right', marginBottom: '30px', fontSize: '1.2em' }}>
            <strong>Total : {cartTotal.toFixed(2)} €</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <Link to="/products" style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
              Continuer mes achats
            </Link>
            <MobileMoneyCheckout cartTotal={cartTotal} onSuccess={handlePaymentSuccess} />
          </div>
        </>
      )}
    </main>
  );
}

export default CartPage;