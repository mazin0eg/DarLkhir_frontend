import { authApi } from '../config/axiosconfig';

export const authService = {
  async register(userData) {
    try {
      console.log('Sending registration data:', userData);

      const response = await authApi.post('/register', {
        email: userData.email,
        password: userData.password,
        confirmPassword: userData.confirmPassword,
        firstName: userData.firstName,
        lastName: userData.lastName
      });

      console.log('Registration response:', response.data);

      if (response.data.success) {
        return {
          success: true,
          message: 'Registration successful! Please check your email for verification.',
          data: response.data.data
        };
      }

      return {
        success: false,
        message: response.data.message || 'Registration failed'
      };
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      
      return {
        success: false,
        message: error.response?.data?.message || error.response?.data?.error || 'Network error occurred'
      };
    }
  },

  async login(credentials) {
    try {
      const response = await authApi.post('/login', credentials);
      
      if (response.data.success) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        
        return {
          success: true,
          data: response.data.data
        };
      }

      return {
        success: false,
        message: response.data.message || 'Login failed'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Network error occurred'
      };
    }
  },

  async verifyToken() {
    try {
      const token = this.getToken();
      if (!token) {
        return { valid: false, message: 'No token found' };
      }

      const response = await authApi.post('/verify');
      
      return {
        valid: response.data.valid,
        user: response.data.user,
        message: response.data.message
      };
    } catch (error) {
      console.error('Token verification error:', error.response?.data || error.message);
      return {
        valid: false,
        message: error.response?.data?.message || 'Token verification failed'
      };
    }
  },

  async validateEmail(code) {
    try {
      // Valider le code avec l'endpoint exact
      const response = await authApi.post('/validate', { code: code });
      
      if (response.data.success || response.data.valid) {
        // Mettre à jour l'utilisateur local si disponible
        const currentUser = this.getCurrentUser();
        if (currentUser) {
          const updatedUser = { ...currentUser, emailVerified: true };
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
        
        return {
          success: true,
          message: response.data.message || 'Email vérifié avec succès !',
          data: response.data.data
        };
      }
      
      return {
        success: false,
        message: response.data.message || 'Code de vérification invalide'
      };
    } catch (error) {
      console.error('Email validation error:', error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.message || 'Code de vérification invalide'
      };
    }
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  getToken() {
    return localStorage.getItem('token');
  },

  isAuthenticated() {
    return !!this.getToken();
  }
};