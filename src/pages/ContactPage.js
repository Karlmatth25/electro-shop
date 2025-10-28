import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './ContactPage.css';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    captcha: '', // Ajout pour CAPTCHA
  });
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const userId = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !userId) {
    console.error('EmailJS configuration manquante. Vérifiez vos variables d\'environnement (.env.local).');
    alert('Configuration EmailJS incomplète. Renseignez les variables dans .env.local.');
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Nom requis';
    if (!formData.email) newErrors.email = 'Email requis';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email invalide';
    if (!formData.message) newErrors.message = 'Message requis';
    if (!formData.captcha || formData.captcha.toLowerCase() !== 'test') newErrors.captcha = 'Entrez "test" pour valider';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSending(true);
    emailjs.send(serviceId, templateId, formData, userId)
      .then(() => {
        setSuccess(true);
        setFormData({ name: '', email: '', message: '', captcha: '' });
        setTimeout(() => setSuccess(false), 5000); // Cache après 5s
      })
      .catch((error) => {
        console.error('Erreur EmailJS:', error);
        setIsSending(false);
        alert('Erreur lors de l\'envoi. Réessayez.');
      })
      .finally(() => setIsSending(false));
  };

  return (
    <main className="contact-page">
      <h2>Contactez-nous</h2>
      <p>Nous sommes à votre disposition. Remplissez le formulaire ci-dessous.</p>
      {success && <p className="success-message">Message envoyé avec succès !</p>}
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Votre nom"
          value={formData.name}
          onChange={handleChange}
          className="input-field"
        />
        {errors.name && <p className="error">{errors.name}</p>}
        <input
          type="email"
          name="email"
          placeholder="Votre email"
          value={formData.email}
          onChange={handleChange}
          className="input-field"
        />
        {errors.email && <p className="error">{errors.email}</p>}
        <textarea
          name="message"
          placeholder="Votre message"
          value={formData.message}
          onChange={handleChange}
          className="textarea-field"
        />
        {errors.message && <p className="error">{errors.message}</p>}
        <input
          type="text"
          name="captcha"
          placeholder="Entrez 'test' pour valider"
          value={formData.captcha}
          onChange={handleChange}
          className="input-field"
        />
        {errors.captcha && <p className="error">{errors.captcha}</p>}
        <button type="submit" className="submit-button" disabled={isSending}>
          {isSending ? 'Envoi...' : 'Envoyer'}
        </button>
      </form>
    </main>
  );
}

export default ContactPage;