import { useState, useEffect } from 'react';
import CodeVerification from '../components/auth/CodeVerification';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const VerifyPage = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Récupérer l'email depuis l'URL ou le localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get('email');
    
    if (emailParam) {
      setUserEmail(emailParam);
    } else {
      // Essayer de récupérer depuis le localStorage
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      if (storedUser.email) {
        setUserEmail(storedUser.email);
      } else {
        setUserEmail('test@example.com'); // Valeur par défaut pour les tests
      }
    }
  }, []);

  const handleVerificationSuccess = (data) => {
    console.log('Verification successful:', data);
    setIsVerified(true);
    
    // Rediriger vers la page d'accueil après 2 secondes
    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  };

  const handleBack = () => {
    window.location.href = '/';
  };

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-16 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-green-600 text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Compte vérifié avec succès !
            </h2>
            <p className="text-gray-600 mb-4">
              Vous allez être redirigé vers la page d'accueil...
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-16">
        <CodeVerification
          userEmail={userEmail}
          onSuccess={handleVerificationSuccess}
          onBack={handleBack}
        />
      </div>
      <Footer />
    </div>
  );
};

export default VerifyPage;