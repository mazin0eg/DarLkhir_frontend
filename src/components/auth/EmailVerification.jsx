import { useState, useEffect } from 'react';
import { authService } from '../../services/authService';
import { CheckCircle, XCircle, RotateCcw, Mail } from '../../utils/icons';

const EmailVerification = () => {
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const email = urlParams.get('email');
    
    if (email) {
      setUserEmail(email);
    }

    if (token) {
      verifyEmailToken(token);
    } else {
      setStatus('error');
      setMessage('Invalid verification link. No token provided.');
    }
  }, []);

  const verifyEmailToken = async (token) => {
    try {
      setStatus('verifying');
      const result = await authService.validateEmail(token);
      
      if (result.success) {
        setStatus('success');
        setMessage('Your email has been verified successfully! You can now log in.');
        
        // Update user data in localStorage if verification includes user data
        if (result.data?.user) {
          const currentUser = authService.getCurrentUser();
          if (currentUser) {
            localStorage.setItem('user', JSON.stringify({
              ...currentUser,
              emailVerified: true
            }));
          }
        }
      } else {
        setStatus('error');
        setMessage(result.message || 'Email verification failed.');
      }
    } catch (error) {
      console.error('Verification error:', error);
      setStatus('error');
      setMessage('An unexpected error occurred during verification.');
    }
  };

  const handleResendVerification = async () => {
    if (!userEmail) {
      setMessage('Email address not found. Please try registering again.');
      return;
    }

    setIsResending(true);
    const result = await authService.resendVerificationEmail(userEmail);
    
    if (result.success) {
      setMessage('Verification email sent! Please check your inbox.');
    } else {
      setMessage(result.message);
    }
    
    setIsResending(false);
  };

  const handleBackToHome = () => {
    window.location.href = '/';
  };

  const handleGoToLogin = () => {
    // For now, we'll just close any modals and show login
    // You can implement proper routing later
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full">
              {status === 'verifying' && (
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              )}
              {status === 'success' && (
                <CheckCircle className="h-8 w-8 text-green-600" />
              )}
              {status === 'error' && (
                <XCircle className="h-8 w-8 text-red-600" />
              )}
            </div>

            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {status === 'verifying' && 'Verifying Your Email'}
              {status === 'success' && 'Email Verified!'}
              {status === 'error' && 'Verification Failed'}
            </h2>

            <div className="mt-4">
              <p className={`text-sm ${
                status === 'success' ? 'text-green-600' : 
                status === 'error' ? 'text-red-600' : 
                'text-gray-600'
              }`}>
                {status === 'verifying' && 'Please wait while we verify your email address...'}
                {message}
              </p>
            </div>

            {status === 'error' && userEmail && (
              <div className="mt-6">
                <button
                  onClick={handleResendVerification}
                  disabled={isResending}
                  className={`w-full flex justify-center items-center space-x-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    isResending
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                >
                  <RotateCcw size={16} />
                  <span>{isResending ? 'Sending...' : 'Resend Verification Email'}</span>
                </button>
              </div>
            )}

            <div className="mt-6">
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={handleBackToHome}
                  className="text-blue-600 hover:text-blue-500 text-sm font-medium"
                >
                  Return to Home
                </button>
                {status === 'success' && (
                  <button
                    onClick={handleGoToLogin}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;