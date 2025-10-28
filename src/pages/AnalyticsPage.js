import React from 'react';
import Analytics from '../components/Analytics';

function AnalyticsPage() {
  return (
    <main style={{ padding: '20px' }}>
      <h2>Statistiques des soumissions</h2>
      <Analytics height={400} /> {/* Hauteur ajustée */}
    </main>
  );
}

export default AnalyticsPage;
