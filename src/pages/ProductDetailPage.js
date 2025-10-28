import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import ProductReviews from '../components/ProductReviews';
import products from '../data/products';

function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(
    products.find(p => p.id === parseInt(id))
  );
  const [selectedImage, setSelectedImage] = useState(product?.image || '');

  if (!product) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Produit non trouvé</div>;
  }

  const handleAddReview = (newReview) => {
    setProduct({
      ...product,
      reviews: [...product.reviews, newReview]
    });
  };

  return (
    <main style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '20px' 
    }}>
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '40px',
        marginBottom: '40px'
      }}>
        <div>
          <div style={{
            border: '1px solid #eee',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            <img
              src={selectedImage}
              alt={product.name}
              style={{ 
                maxWidth: '100%',
                maxHeight: '400px',
                objectFit: 'contain'
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {[product.image, ...(product.additionalImages || [])].map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(img)}
                style={{
                  width: '60px',
                  height: '60px',
                  padding: '5px',
                  border: selectedImage === img ? '2px solid #007bff' : '1px solid #ddd',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  background: 'none'
                }}
              >
                <img 
                  src={img} 
                  alt={`Vue ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h1 style={{ marginTop: 0 }}>{product.name}</h1>
          <div style={{ 
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#007bff',
            margin: '20px 0'
          }}>
            {product.price.toFixed(2)} €
          </div>

          <div style={{ marginBottom: '30px' }}>
            <h3>Description</h3>
            <p style={{ lineHeight: '1.6' }}>{product.description}</p>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <h3>Caractéristiques</h3>
            <ul style={{ paddingLeft: '20px' }}>
              {product.features?.map((feature, index) => (
                <li key={index}>{feature}</li>
              )) || <li>Aucune caractéristique spécifiée</li>}
            </ul>
          </div>

          <button
            onClick={() => {
              addToCart(product);
              alert('Produit ajouté au panier');
            }}
            style={{
              padding: '12px 24px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: 'pointer',
              width: '100%',
              maxWidth: '300px'
            }}
          >
            Ajouter au panier
          </button>
        </div>
      </div>

      <ProductReviews 
        product={product} 
        onAddReview={handleAddReview} 
      />
    </main>
  );
}

export default ProductDetailPage;