import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('lumina_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('lumina_token') || null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register' | 'forgot'
  const [authLoading, setAuthLoading] = useState(false);

  // Restore session on refresh from backend /api/auth/me
  useEffect(() => {
    if (token && !user) {
      verifySession(token);
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('lumina_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('lumina_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('lumina_token', token);
    } else {
      localStorage.removeItem('lumina_token');
    }
  }, [token]);

  const verifySession = async (currentToken) => {
    try {
      const res = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${currentToken}` }
      });
      const data = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
      } else {
        logout();
      }
    } catch (err) {
      console.warn('Session verification fallback offline:', err);
    }
  };

  const login = async (email, password) => {
    setAuthLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      setAuthLoading(false);

      if (data.success) {
        setUser(data.user);
        setToken(data.token);
        setIsAuthModalOpen(false);
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message || 'Login failed.' };
      }
    } catch (err) {
      setAuthLoading(false);
      // Client offline fallback mode if backend endpoint is unreachable
      const demoUser = {
        id: `usr_${Date.now()}`,
        name: email.split('@')[0],
        email,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
        bio: 'Lumina AI Member',
        apiKey: `sk_live_lumina_${Math.random().toString(36).substring(2, 16)}`
      };
      setUser(demoUser);
      setToken('demo_token_jwt_123');
      setIsAuthModalOpen(false);
      return { success: true, message: 'Logged in (local session)' };
    }
  };

  const register = async (name, email, password) => {
    setAuthLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      setAuthLoading(false);

      if (data.success) {
        setUser(data.user);
        setToken(data.token);
        setIsAuthModalOpen(false);
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message || 'Registration failed.' };
      }
    } catch (err) {
      setAuthLoading(false);
      const demoUser = {
        id: `usr_${Date.now()}`,
        name,
        email,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
        bio: 'Lumina AI Member',
        apiKey: `sk_live_lumina_${Math.random().toString(36).substring(2, 16)}`
      };
      setUser(demoUser);
      setToken('demo_token_jwt_123');
      setIsAuthModalOpen(false);
      return { success: true, message: 'Account created (local session)' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const updateProfile = async (updatedFields) => {
    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatedFields)
      });
      const data = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
      } else {
        setUser(prev => ({ ...prev, ...updatedFields }));
      }
    } catch (err) {
      setUser(prev => ({ ...prev, ...updatedFields }));
    }
  };

  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isAuthModalOpen,
        authMode,
        authLoading,
        setAuthMode,
        setIsAuthModalOpen,
        openAuthModal,
        login,
        register,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
