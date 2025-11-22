import { Heart, Wallet } from '../../utils/icons';

const Hero = () => {
  return (
    <div id="home" className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 pt-20 px-4 sm:px-6 lg:px-8">
          <main className="mt-10 mx-auto max-w-7xl sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Find Your Home,</span>{' '}
                <span className="block text-red-600 xl:inline">Finance Your Future</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Welcome to the Darlkhir Platform. We simplify your real estate journey by connecting 
                <strong> Darna</strong> (Buying, Selling & Renting) with <strong>Tirlire</strong> (Real Estate Financing). 
                One solution, complete peace of mind.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a href="#about" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-zinc-800 md:py-4 md:text-lg transition-colors">
                    Our Solution
                  </a>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a href="#contact" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 md:py-4 md:text-lg transition-colors">
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-gray-50 border-l border-gray-100 flex items-center justify-center overflow-hidden">
         <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob top-0 right-0"></div>
            <div className="absolute w-96 h-96 bg-black rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000 bottom-0 left-0"></div>
            <div className="grid grid-cols-2 gap-8 p-12 z-10">
                <div className="bg-white p-6 rounded-2xl shadow-xl border-t-4 border-red-600 transform hover:-translate-y-2 transition-transform duration-300">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <Heart className="text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Darna</h3>
                    <p className="text-gray-500 mt-2 text-sm">Buy, Sell, Rent</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-xl border-t-4 border-black transform hover:-translate-y-2 transition-transform duration-300 mt-12">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <Wallet className="text-black" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Tirlire</h3>
                    <p className="text-gray-500 mt-2 text-sm">Smart Financing</p>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Hero;