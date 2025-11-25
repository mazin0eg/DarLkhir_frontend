import { useState } from 'react';
import { authService } from '../../services/authService';
import { Mail, RotateCcw } from '../../utils/icons';

const VerificationTester = () => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testResendVerification = async () => {
    if (!email) {
      setResult('Please enter an email address');
      return;
    }

    setLoading(true);
    const response = await authService.resendVerificationEmail(email);
    setResult(JSON.stringify(response, null, 2));
    setLoading(false);
  };

  const testEmailValidation = async () => {
    if (!token) {
      setResult('Please enter a token');
      return;
    }

    setLoading(true);
    const response = await authService.validateEmail(token);
    setResult(JSON.stringify(response, null, 2));
    setLoading(false);
  };

  const testTokenVerification = async () => {
    setLoading(true);
    const response = await authService.verifyToken();
    setResult(JSON.stringify(response, null, 2));
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Verification Testing Panel</h2>
      
      <div className="space-y-6">
        {/* Test Resend Verification */}
        <div className="border p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Test Resend Verification Email</h3>
          <div className="flex gap-2 mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              className="flex-1 px-3 py-2 border rounded-md"
            />
            <button
              onClick={testResendVerification}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              <Mail size={16} />
            </button>
          </div>
        </div>

        {/* Test Email Validation */}
        <div className="border p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Test Email Validation</h3>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Enter verification token"
              className="flex-1 px-3 py-2 border rounded-md"
            />
            <button
              onClick={testEmailValidation}
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              Validate
            </button>
          </div>
        </div>

        {/* Test Token Verification */}
        <div className="border p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Test JWT Token Verification</h3>
          <button
            onClick={testTokenVerification}
            disabled={loading}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
          >
            <RotateCcw size={16} className="inline mr-2" />
            Verify Current Token
          </button>
        </div>

        {/* Results */}
        <div className="border p-4 rounded-lg bg-gray-50">
          <h3 className="text-lg font-semibold mb-3">Result</h3>
          <pre className="text-sm bg-white p-3 rounded border overflow-auto">
            {result || 'No results yet...'}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default VerificationTester;