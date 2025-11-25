import { useState, useEffect } from 'react';
import { User, LogIn, LogOut, Menu, X } from '../../utils/icons';
import AuthContainer from '../auth/AuthContainer';
import { authService } from '../../services/authService';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authMode, setAuthMode] = useState(null); // null, 'login', 'register'
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleAuthSuccess = () => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setAuthMode(null);
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };

  const openLogin = () => {
    setAuthMode('login');
    setIsMenuOpen(false);
  };

  const openRegister = () => {
    setAuthMode('register');
    setIsMenuOpen(false);
  };

  const closeAuth = () => {
    setAuthMode(null);
  };

  return (
    <>
      <nav className="bg-white shadow-sm fixed w-full z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">DarLkhir</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">
                About
              </a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                Contact
              </a>
              
              <div className="flex items-center space-x-4">
                {user ? (
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-700">
                      Welcome, {user.firstName}!
                    </span>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center space-x-2 px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <>
                    <button 
                      onClick={openRegister}
                      className="flex items-center space-x-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      <User size={18} />
                      <span>Register</span>
                    </button>
                    
                    <button 
                      onClick={openLogin}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <LogIn size={18} />
                      <span>Login</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-600 p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                <a href="#home" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                  Home
                </a>
                <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                  About
                </a>
                <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                  Contact
                </a>
                <div className="flex flex-col space-y-2 px-3 py-2">
                  {user ? (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">Welcome, {user.firstName}!</p>
                      <button 
                        onClick={handleLogout}
                        className="flex items-center justify-center space-x-2 px-4 py-2 text-red-600 border border-red-600 rounded-lg"
                      >
                        <LogOut size={18} />
                        <span>Logout</span>
                      </button>
                    </div>
                  ) : (
                    <>
                      <button 
                        onClick={openRegister}
                        className="flex items-center justify-center space-x-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg"
                      >
                        <User size={18} />
                        <span>Register</span>
                      </button>
                      <button 
                        onClick={openLogin}
                        className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
                      >
                        <LogIn size={18} />
                        <span>Login</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {authMode && (
        <AuthContainer
          initialMode={authMode}
          onClose={closeAuth}
          onSuccess={handleAuthSuccess}
        />
      )}
    </>
  );
};

export default Navbar;