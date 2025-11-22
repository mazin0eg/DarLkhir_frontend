import { useState } from 'react';
import { Phone, Mail, MapPin } from '../../utils/icons';

const Contact = () => {
  const [formStatus, setFormStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => setFormStatus('success'), 1500);
  };

  return (
    <div id="contact" className="bg-white py-20 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Get in Touch</h2>
            <p className="mt-4 text-lg text-gray-500">
              Have questions about accessing Darna or Tirlire? Our support team is here to help you with account linking and SSO issues.
            </p>
            
            <div className="mt-8 space-y-6">
              <div className="flex items-center">
                <div className="shrink-0">
                  <Phone className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-3 text-base text-gray-500">
                  +212 5 22 00 00 00
                </div>
              </div>
              <div className="flex items-center">
                <div className="shrink-0">
                  <Mail className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-3 text-base text-gray-500">
                  support@darlkhir.ma
                </div>
              </div>
              <div className="flex items-center">
                <div className="shrink-0">
                  <MapPin className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-3 text-base text-gray-500">
                  123 Tech Park, Casablanca, Morocco
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input 
                  type="text" 
                  id="name" 
                  required 
                  className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-red-500 focus:border-red-500" 
                  placeholder="Your full name" 
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input 
                  type="email" 
                  id="email" 
                  required 
                  className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-red-500 focus:border-red-500" 
                  placeholder="you@example.com" 
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea 
                  id="message" 
                  rows={4} 
                  required 
                  className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-red-500 focus:border-red-500" 
                  placeholder="How can we help you?"
                />
              </div>
              
              <button 
                type="submit" 
                disabled={formStatus === 'submitting' || formStatus === 'success'}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-all
                  ${formStatus === 'success' ? 'bg-green-600' : 'bg-black hover:bg-zinc-800'}
                  ${formStatus === 'submitting' ? 'opacity-75 cursor-wait' : ''}
                `}
              >
                {formStatus === 'idle' && 'Send Message'}
                {formStatus === 'submitting' && 'Sending...'}
                {formStatus === 'success' && 'Message Sent!'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;