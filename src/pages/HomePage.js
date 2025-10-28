// Page Accueil avec animations GSAP et son de clic néon (3D temporairement désactivé)
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import products from '../data/products';
import './HomePage.css';
import { Howl } from 'howler';
import { gsap } from 'gsap';
import { Canvas } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';

// Fond 3D: sphères/icosa flottantes avec matières émissives (compat React 18)
function Background3D() {
  return (
    <Canvas style={{ position: 'absolute', inset: 0 }} camera={{ position: [0, 0, 6], fov: 60 }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1.2} />
      <Float speed={2} rotationIntensity={0.6} floatIntensity={1.2}>
        <mesh position={[-1.8, 0.6, 0]}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial color="#00D1FF" emissive="#00D1FF" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[1.6, -0.4, -0.5]}>
          <icosahedronGeometry args={[0.9, 0]} />
          <meshStandardMaterial color="#8B00FF" emissive="#8B00FF" emissiveIntensity={0.5} />
        </mesh>
      </Float>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
    </Canvas>
  );
}

function HomePage() {
  const featuredProducts = products.slice(0, 4);
  const [currentSlide, setCurrentSlide] = useState(0);
  const pageRef = useRef(null);

  // Son de clic néon (data URI court)
  const clickSound = useMemo(() => new Howl({
    src: ['data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABYAWGFkYQAAAAA='],
    volume: 0.5,
  }), []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  };

  // Animations d'entrée GSAP
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-title', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' });
      gsap.from('.hero-text', { y: 24, opacity: 0, duration: 0.6, delay: 0.1, ease: 'power2.out' });
      gsap.from('.cta-button', { y: 28, opacity: 0, duration: 0.6, delay: 0.2, ease: 'power2.out' });
      gsap.from('.slide', { y: 40, opacity: 0, duration: 0.5, stagger: 0.08, delay: 0.3, ease: 'power2.out' });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <main className="homepage" ref={pageRef}>
      <section className="hero">
        {/* Canvas 3D en fond */}
        <Background3D />
        <div className="hero-content">
          <h1 className="hero-title">My Electro Shop Togo</h1>
          <p className="hero-text">Les meilleurs gadgets électroniques à portée de clic !</p>
          <Link to="/products" className="cta-button" onClick={() => clickSound.play()}>Découvrir Maintenant</Link>
        </div>
      </section>
      <section className="featured-products">
        <h2 className="section-title">Produits Populaires</h2>
        <div className="slider-container">
          <button className="slider-arrow prev" onClick={prevSlide}>&lt;</button>
          <div className="slider">
            <div className="slider-track" style={{ transform: `translateX(-${currentSlide * 25}%)` }}>
              {featuredProducts.map((product) => (
                <div key={product.id} className="slide">
                  <ProductCard {...product} />
                </div>
              ))}
            </div>
          </div>
          <button className="slider-arrow next" onClick={nextSlide}>&gt;</button>
        </div>
      </section>
    </main>
  );
}

export default HomePage;