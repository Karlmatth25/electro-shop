/* Loader néon animé affiché pendant le chargement initial */
import React, { useEffect } from 'react';

export default function Loader({ accentColor = '#00D1FF', accentSecondary = '#8B00FF' }) {
  useEffect(() => {
    // Injecte des keyframes pour l'animation localement
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
    @keyframes loaderPulse { 0% { transform: scaleX(0.1); opacity: .6 } 50% { transform: scaleX(1); opacity: 1 } 100% { transform: scaleX(0.1); opacity: .6 } }
    `;
    document.head.appendChild(styleEl);
    return () => { document.head.removeChild(styleEl); };
  }, []);

  return (
    <div style={styles.container}>
      <div style={{ ...styles.bar, background: `linear-gradient(90deg, ${accentColor}, ${accentSecondary})` }}>
        <div style={{ ...styles.glow, boxShadow: `0 0 12px ${accentColor}, 0 0 24px ${accentSecondary}` }} />
      </div>
      <p style={styles.text}>Chargement...</p>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    width: '100%',
    background: 'var(--bg)',
    color: 'var(--text)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  bar: {
    width: 220,
    height: 8,
    borderRadius: 999,
    position: 'relative',
    overflow: 'hidden',
    animation: 'loaderPulse 1.6s infinite ease-in-out',
  },
  glow: {
    position: 'absolute',
    inset: 0,
    filter: 'blur(6px)',
  },
  text: { fontFamily: 'Orbitron, sans-serif', opacity: 0.9 },
};
