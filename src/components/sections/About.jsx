import { Heart, Wallet, LogIn } from '../../utils/icons';

const About = () => {
  return (
    <div id="about" className="py-20 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-red-600 font-semibold tracking-wide uppercase">
            Our Ecosystem
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            From Searching to Ownership
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Darlkhir provides a seamless bridge between finding a property and securing the funds to acquire it.
          </p>
        </div>

        <div className="mt-16">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div className="relative bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-red-600 text-white">
                <Heart size={24} />
              </div>
              <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                Darna Marketplace
              </p>
              <p className="mt-2 ml-16 text-base text-gray-500">
                Explore a vast catalog of real estate listings. Whether you are looking to buy, sell, or rent apartments, houses, or commercial spaces, Darna connects you with the right opportunities.
              </p>
            </div>

            <div className="relative bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-black text-white">
                <Wallet size={24} />
              </div>
              <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                Tirlire Financing
              </p>
              <p className="mt-2 ml-16 text-base text-gray-500">
                Found your dream home on Darna? Tirlire offers integrated financing solutions, loans, and investment plans to help you acquire it without the hassle of traditional banking.
              </p>
            </div>

            <div className="relative bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow col-span-2 mt-4 bg-gradient-to-r from-white to-red-50">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="shrink-0 p-4 bg-red-100 rounded-full text-red-600">
                  <LogIn size={32} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Single Sign-On (SSO) Access
                  </h3>
                  <p className="mt-2 text-gray-600">
                    We&apos;ve removed the friction. With our SSO technology, you log in once to browse properties on Darna and instantly qualify for financing on Tirlire. It&apos;s a unified ecosystem for your real estate needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;