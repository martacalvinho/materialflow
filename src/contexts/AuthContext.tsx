import React, { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabase } from '../hooks/useSupabase';
import type { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, metadata?: any) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const { user, loading, signIn: supabaseSignIn, signUp: supabaseSignUp, signOut: supabaseSignOut } = useSupabase();

  const signIn = async (email: string, password: string) => {
    await supabaseSignIn(email, password);
    navigate('/dashboard');
  };

  const signUp = async (email: string, password: string, metadata?: any) => {
    await supabaseSignUp(email, password, metadata);
    // Don't navigate yet - user needs to verify email
  };

  const signOut = async () => {
    try {
      await supabaseSignOut();
    } catch (error) {
      console.error('Error during sign out:', error);
      // Even if signOut fails, we still want to clear local state
    } finally {
      // Always navigate to login page, regardless of signOut success/failure
      navigate('/login');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};