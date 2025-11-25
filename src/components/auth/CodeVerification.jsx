import { useState, useRef, useEffect } from 'react';
import { authService } from '../../services/authService';
import { Mail } from '../../utils/icons';

const CodeVerification = ({ userEmail, onSuccess, onBack }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Clear error message when typing
    if (message) {
      setMessage('');
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && code[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const pastedCode = pastedData.replace(/\D/g, '').slice(0, 6);
    
    if (pastedCode.length === 6) {
      const newCode = pastedCode.split('');
      setCode(newCode);
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const verificationCode = code.join('');
    if (verificationCode.length !== 6) {
      setMessage('Veuillez saisir le code à 6 chiffres complet');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const result = await authService.validateEmail(verificationCode);
      
      if (result.success) {
        setMessage('Compte vérifié avec succès ! Redirection...');
        setTimeout(() => {
          onSuccess?.(result.data);
        }, 1500);
      } else {
        setMessage(result.message || 'Code de vérification invalide');
      }
    } catch (error) {
      setMessage('Une erreur est survenue lors de la vérification');
    }

    setLoading(false);
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
            
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Vérifiez votre email
            </h2>
            
            <p className="mt-2 text-center text-sm text-gray-600">
              Nous avons envoyé un code à 6 chiffres à
            </p>
            <p className="text-center text-sm font-medium text-gray-900">
              {userEmail}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8">
            <div className="flex justify-center space-x-3">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={loading}
                />
              ))}
            </div>

            {message && (
              <div className={`mt-4 p-3 rounded-md text-sm text-center ${
                message.includes('succès') || message.includes('envoyé')
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || code.join('').length !== 6}
              className={`mt-6 w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors ${
                loading || code.join('').length !== 6
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {loading ? 'Vérification en cours...' : 'Vérifier le code'}
            </button>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={onBack}
                className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                ← Retour à la connexion
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CodeVerification;