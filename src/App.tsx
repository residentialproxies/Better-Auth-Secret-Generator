import React from 'react';
import Header from './components/Header';
import SecretGenerator from './components/SecretGenerator';
import InfoSection from './components/InfoSection';
import Footer from './components/Footer';
import SEOContent from './components/SEOContent';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <SecretGenerator />
        <InfoSection />
        <SEOContent />
      </main>
      <Footer />
    </div>
  );
}

export default App;