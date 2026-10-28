/**
 * SMARTDEPT Frontend - Auth Context
 *
 * Manages authentication state:
 * - Token stored in localStorage
 * - User role ALWAYS comes from the server (DB), never from frontend state alone
 * - On app load, validates token via /auth/me to get fresh role from DB
 */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi } from '../api/client';

const AuthContext = createContext(null);

/** Maps server role strings to internal sidebar role keys */
const ROLE_MAP = {
  STUDENT: 'student',
  FACULTY: 'faculty',
  HOD: 'hod',
  ADMIN: 'admin',
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);           // Full user object from server
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // true while validating stored token

  /** Hydrate from stored token on app start */
  useEffect(() => {
    const storedToken = localStorage.getItem('smartdept_token');
    if (storedToken) {
      authApi.getMe()
        .then((userData) => {
          setUser(userData);
          setIsAuthenticated(true);
        })
        .catch(() => {
          // Token invalid / expired — clear it
          localStorage.removeItem('smartdept_token');
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  /** Called after successful OTP verification */
  const login = useCallback((tokenResponse) => {
    const { access_token, user: userData } = tokenResponse;
    localStorage.setItem('smartdept_token', access_token);
    setUser(userData);
    setIsAuthenticated(true);
  }, []);

  /** Logout: server + client cleanup */
  const logout = useCallback(async () => {
    await authApi.logout().catch(() => null);
    localStorage.removeItem('smartdept_token');
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  /**
   * Internal role key for routing — derived from DB role, never from user input.
   * Falls back to 'student' as the safest default.
   */
  const internalRole = user ? (ROLE_MAP[user.role] || 'student') : 'student';

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        internalRole,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
