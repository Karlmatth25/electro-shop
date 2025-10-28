import React from 'react';
import { useSearchParams } from 'react-router-dom';
import emailjs from 'emailjs-com';

function PaymentPage() {
  const [searchParams] = useSearchParams();
  const tx = searchParams.get('tx');
  const amount = searchParams.get('amount');

  const handleConfirmPayment = () => {
    // Envoi d'email de confirmation
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID; // Utilise le même ou un nouveau template
    const userId = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    if (serviceId && templateId && userId) {
      emailjs.send(serviceId, templateId, {
        to_email: process.env.REACT_APP_ADMIN_EMAIL || 'tonemail@gmail.com',
        subject: 'Confirmation de paiement - MyElectroShop',
        message: `Paiement confirmé !\nTransaction ID: ${tx}\nMontant: ${amount} XOF`,
      }, userId).then(() => {
        console.log('Email de confirmation envoyé.');
      }).catch((error) => {
        console.error('Erreur EmailJS:', error);
      });
    }
    window.location.href = '/cart?success=true';
  };

  return (
    <main style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Paiement Simulé</h2>
      <p>Méthode : {tx.includes('mtn') ? 'MTN Mobile Money' : 'Flooz'}</p>
      <p>Transaction ID : {tx}</p>
      <p>Montant : {amount} XOF</p>
      <button
        onClick={handleConfirmPayment}
        style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}
      >
        Confirmer le paiement
      </button>
    </main>
  );
}

export default PaymentPage;