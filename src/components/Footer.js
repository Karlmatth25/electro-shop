import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

function Footer({
  companyDescription = 'My Electro Shop Togo - Votre partenaire pour les gadgets électroniques à Lomé et au-delà.',
  links = [
    { to: '/mentions-legales', label: 'Mentions légales' },
    { to: '/confidentialite', label: 'Politique de confidentialité' },
    { to: '/contact', label: 'Contact' },
  ],
  socialLinks = [
    { href: 'https://facebook.com', icon: faFacebook },
    { href: 'https://twitter.com', icon: faTwitter },
    { href: 'https://instagram.com', icon: faInstagram },
  ],
}) {
  return (
    <footer className="footer">
      <div className="footer-section company-info">
        <p>{companyDescription}</p>
      </div>
      <div className="footer-section footer-links">
        {links.map((link, index) => (
          <Link key={index} to={link.to} className="footer-link">
            {link.label}
          </Link>
        ))}
      </div>
      <div className="footer-section social-links">
        {socialLinks.map((social, index) => (
          <a key={index} href={social.href} className="social-icon" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={social.icon} />
          </a>
        ))}
      </div>
      <p className="copyright">&copy; {new Date().getFullYear()} My Electro Shop Togo. Tous droits réservés.</p>
    </footer>
  );
}

export default Footer;