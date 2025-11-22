import { useState } from 'react';
import { LogIn, ChevronDown, Heart, Wallet, X, Menu } from '../../utils/icons';

const Navbar = ({ toggleLoginMenu, isLoginOpen }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSSORedirect = (app) => {
    console.log(`Redirecting to ${app} app`);
  };

  return (
    <nav className="bg-black text-white sticky top-0 z-50 border-b-4 border-red-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="shrink-0 flex items-center gap-2 cursor-pointer">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <span className="font-bold text-2xl tracking-wider">DARLKHIR</span>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#home" className="hover:text-red-500 transition-colors px-3 py-2 rounded-md font-medium">
                Home
              </a>
              <a href="#about" className="hover:text-red-500 transition-colors px-3 py-2 rounded-md font-medium">
                About Us
              </a>
              <a href="#contact" className="hover:text-red-500 transition-colors px-3 py-2 rounded-md font-medium">
                Contact
              </a>
              
              <div className="relative">
                <button 
                  onClick={toggleLoginMenu}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-medium flex items-center gap-2 transition-all"
                >
                  <LogIn size={18} />
                  Login
                  <ChevronDown size={16} className={`transition-transform ${isLoginOpen ? 'rotate-180' : ''}`} />
                </button>

                {isLoginOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-xl py-2 text-black border border-gray-200">
                    <button 
                      onClick={() => handleSSORedirect('Darna')}
                      className="w-full text-left px-4 py-3 hover:bg-red-50 flex items-center gap-3 group transition-colors"
                    >
                      <div className="p-2 bg-red-100 rounded-full text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                        <Heart size={16} />
                      </div>
                      <span className="font-medium">Darna App</span>
                    </button>
                    <div className="h-px bg-gray-100 mx-2 my-1"></div>
                    <button 
                      onClick={() => handleSSORedirect('Tirlire')}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 group transition-colors"
                    >
                      <div className="p-2 bg-gray-100 rounded-full text-gray-600 group-hover:bg-black group-hover:text-white transition-colors">
                        <Wallet size={16} />
                      </div>
                      <span className="font-medium">Tirlire App</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-red-500 focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-zinc-900 pb-4">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#home" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Home
            </a>
            <a href="#about" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              About
            </a>
            <a href="#contact" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Contact
            </a>
            <div className="pt-4 space-y-2 px-3">
              <p className="text-gray-400 text-sm uppercase tracking-wider font-semibold">
                Login to:
              </p>
              <button 
                onClick={() => handleSSORedirect('Darna')} 
                className="w-full bg-red-600 text-white px-4 py-2 rounded-md flex items-center gap-2 justify-center"
              >
                <Heart size={16} /> Darna
              </button>
              <button 
                onClick={() => handleSSORedirect('Tirlire')} 
                className="w-full bg-white text-black px-4 py-2 rounded-md flex items-center gap-2 justify-center"
              >
                <Wallet size={16} /> Tirlire
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;