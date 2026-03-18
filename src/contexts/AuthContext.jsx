import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription?.unsubscribe();
  }, []);

  const login = async (email, password) => {
    setError(null);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const register = async (email, password) => {
    setError(null);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = async () => {
    setError(null);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Get user role based on email
  const getUserRole = () => {
    if (!user || !user.email) return null;
    
    const email = user.email.toLowerCase();
    
    // Explicit test accounts
    if (email === 'admin@boss.com') return 'Super Admin';
    if (email === 'staff@bplo.gov.ph') return 'BPLO Staff';
    if (email === 'treasurer@payment.gov.ph') return 'Treasurer';
    if (email === 'endorsing@sanitary.gov.ph') return 'Endorsing Office';
    
    // Pattern matching for other accounts
    if (email.includes('admin')) {
      return 'Super Admin';
    } else if (email.includes('bplo') || email.includes('staff')) {
      return 'BPLO Staff';
    } else if (email.includes('treasurer') || email.includes('payment')) {
      return 'Treasurer';
    } else if (email.includes('endorsing') || email.includes('sanitary') || email.includes('fire') || email.includes('building')) {
      return 'Endorsing Office';
    }
    return 'User';
  };

  const userRole = getUserRole();
  const isAdmin = user?.email === 'admin@boss.com';

  const value = {
    user,
    userRole,
    isLoading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
