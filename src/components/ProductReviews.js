import { Link } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function ProductReviews({ product, onAddReview }) {
  // État pour la note (1-5 étoiles) et le commentaire
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  
  // Récupération de l'utilisateur connecté
  const { user } = useContext(AuthContext);

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    
    // Création de la nouvelle évaluation
    const newReview = {
      id: Math.max(...product.reviews.map(r => r.id), 0) + 1,
      userId: user.id,
      userName: user.name,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0] // Date au format YYYY-MM-DD
    };
    
    // Envoi au composant parent
    onAddReview(newReview);
    
    // Réinitialisation du formulaire
    setComment('');
    setRating(5);
  };

  return (
    <div style={{ marginTop: '40px', padding: '20px', borderTop: '1px solid #eee' }}>
      <h3 style={{ marginBottom: '20px' }}>
        Évaluations ({product.reviews.length})
      </h3>
      
      {/* PARTIE 1 : FORMULAIRE (visible seulement si connecté) */}
      {user ? (
        <form onSubmit={handleSubmit} style={{ 
          marginBottom: '30px',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <h4 style={{ marginTop: 0 }}>Donnez votre avis</h4>
          
          {/* Notation par étoiles */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Note :</label>
            <div style={{ display: 'flex', gap: '5px' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  style={{ 
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '24px',
                    color: star <= rating ? '#ffc107' : '#e4e5e9',
                    padding: 0
                  }}
                  aria-label={`${star} étoile${star > 1 ? 's' : ''}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          
          {/* Champ commentaire */}
          <div style={{ marginBottom: '15px' }}>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Votre avis sur ce produit..."
              required
              style={{ 
                width: '100%', 
                minHeight: '100px', 
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
          </div>
          
          {/* Bouton soumission */}
          <button 
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Envoyer l'évaluation
          </button>
        </form>
      ) : (
        /* PARTIE 2 : MESSAGE POUR NON-CONNECTÉS (avec lien vers login) */
        <div style={{ 
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          <p style={{ margin: 0 }}>
            <Link to="/login" style={{ color: '#007bff', textDecoration: 'none' }}>
              Connectez-vous
            </Link> pour laisser une évaluation
          </p>
        </div>
      )}

      {/* PARTIE 3 : LISTE DES ÉVALUATIONS EXISTANTES */}
      {product.reviews.length > 0 ? (
        <div style={{ marginTop: '20px' }}>
          {product.reviews.map((review) => (
            <div key={review.id} style={{ 
              padding: '15px 0',
              borderBottom: '1px solid #eee'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <strong>{review.userName || 'Anonyme'}</strong>
                  <span style={{ 
                    color: '#6c757d',
                    fontSize: '0.9em',
                    marginLeft: '10px'
                  }}>
                    {review.date}
                  </span>
                </div>
                {/* Affichage des étoiles pour chaque review */}
                <div style={{ color: '#ffc107' }}>
                  {'★'.repeat(review.rating)}
                  {'☆'.repeat(5 - review.rating)}
                </div>
              </div>
              <p style={{ 
                margin: '10px 0 0',
                lineHeight: '1.5'
              }}>
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: '#6c757d' }}>Aucune évaluation pour ce produit</p>
      )}
    </div>
  );
}

export default ProductReviews;