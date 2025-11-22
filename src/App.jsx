import { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('nav')) {
        setIsLoginOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleLoginMenu = (e) => {
    e.stopPropagation();
    setIsLoginOpen(!isLoginOpen);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 scroll-smooth">
      <Navbar toggleLoginMenu={toggleLoginMenu} isLoginOpen={isLoginOpen} />
      <Hero />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
