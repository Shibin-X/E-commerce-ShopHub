import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { login as loginApi, register as registerApi, getMe } from '../api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const persistAuth = useCallback((authData) => {
    localStorage.setItem('token', authData.token);
    localStorage.setItem('role', authData.role);
    localStorage.setItem('user', JSON.stringify({
      name: authData.name,
      email: authData.email,
      role: authData.role,
    }));
    setUser({ name: authData.name, email: authData.email });
    setRole(authData.role);
  }, []);

  const clearAuth = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    setUser(null);
    setRole(null);
  }, []);

  const logout = useCallback(() => {
    clearAuth();
  }, [clearAuth]);

  const login = useCallback(async (credentials) => {
    const data = await loginApi(credentials);
    persistAuth(data);
    return data;
  }, [persistAuth]);

  const register = useCallback(async (userData) => {
    const data = await registerApi(userData);
    persistAuth(data);
    return data;
  }, [persistAuth]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    const storedUser = localStorage.getItem('user');

    if (!token) {
      setLoading(false);
      return;
    }

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setRole(storedRole);
      } catch {
        clearAuth();
      }
    }

    getMe()
      .then((data) => {
        setUser({ name: data.name, email: data.email });
        setRole(data.role);
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('role', data.role);
      })
      .catch(() => {
        clearAuth();
      })
      .finally(() => {
        setLoading(false);
      });
  }, [clearAuth]);

  const value = {
    user,
    role,
    loading,
    isAuthenticated: !!user,
    isAdmin: role === 'ADMIN',
    isCustomer: role === 'CUSTOMER',
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
