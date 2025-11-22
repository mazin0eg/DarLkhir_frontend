const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <span className="text-2xl font-bold tracking-wider">DARLKHIR</span>
          <p className="text-gray-400 text-sm mt-1">
            © 2024 Darlkhir Platform. All rights reserved.
          </p>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;