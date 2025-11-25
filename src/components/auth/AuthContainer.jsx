import { useState } from 'react';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import CodeVerification from './CodeVerification';

const AuthContainer = ({ onClose, initialMode = 'login' }) => {
  const [currentView, setCurrentView] = useState(initialMode); // 'login', 'register', 'verify'
  const [userEmail, setUserEmail] = useState('');
  const [userData, setUserData] = useState(null);

  const handleRegistrationSuccess = (data) => {
    if (data.needsVerification) {
      setUserEmail(data.email);
      setUserData(data.user);
      setCurrentView('verify');
    } else {
      // Si pas besoin de vérification, fermer directement
      onClose?.();
    }
  };

  const handleLoginSuccess = (data) => {
    setUserData(data.user || data);
    onClose?.();
  };

  const handleVerificationSuccess = (data) => {
    // Mise à jour de l'utilisateur avec le statut vérifié
    const updatedUser = { ...userData, emailVerified: true };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    // Fermer le modal et rediriger vers la page d'accueil
    onClose?.();
    
    // Redirection vers la section home
    setTimeout(() => {
      window.location.hash = '#home';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
  };

  const handleBackToLogin = () => {
    setCurrentView('login');
    setUserEmail('');
    setUserData(null);
  };

  const switchToRegister = () => {
    setCurrentView('register');
  };

  const switchToLogin = () => {
    setCurrentView('login');
  };

  if (currentView === 'verify') {
    return (
      <CodeVerification
        userEmail={userEmail}
        onSuccess={handleVerificationSuccess}
        onBack={handleBackToLogin}
      />
    );
  }

  if (currentView === 'register') {
    return (
      <RegisterForm
        onSuccess={handleRegistrationSuccess}
        onClose={onClose}
        onSwitchToLogin={switchToLogin}
      />
    );
  }

  return (
    <LoginForm
      onSuccess={handleLoginSuccess}
      onClose={onClose}
      onSwitchToRegister={switchToRegister}
    />
  );
};

export default AuthContainer;