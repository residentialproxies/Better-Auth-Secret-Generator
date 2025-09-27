import React from 'react';
import Header from './components/Header';
import SecretGenerator from './components/SecretGenerator';
import InfoSection from './components/InfoSection';
import Footer from './components/Footer';
import SEOContent from './components/SEOContent';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200">
      <Header />
      <main className="container mx-auto px-4 py-8" id="generator">
        <SecretGenerator />
        <div id="guide">
          <InfoSection />
        </div>
        <div id="faq">
          <SEOContent />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;