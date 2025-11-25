import { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import EmailVerification from './components/auth/EmailVerification';

function App() {
  const [isVerificationPage, setIsVerificationPage] = useState(false);

  useEffect(() => {
    // Check if this is a verification page by looking for token in URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    if (token) {
      setIsVerificationPage(true);
    }
  }, []);

  // If this is a verification page, show only the verification component
  if (isVerificationPage) {
    return (
      <div className="min-h-screen bg-gray-50">
        <EmailVerification />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 scroll-smooth">
      <Navbar />
      <Hero />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
