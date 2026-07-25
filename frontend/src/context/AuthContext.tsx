import React, { createContext, useState, useEffect, useContext, useCallback, useRef } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../services/supabase';
import { AuthService, UserProfile } from '../services/authService';
import { useQueryClient } from '@tanstack/react-query';

export interface AuthContextProps {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  requiresProfileSetup: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<User | null>;
  logout: () => Promise<void>;
  syncProfile: (profileData: Omit<UserProfile, 'id' | 'email'>) => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  updateUserPassword: (password: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

/**
 * AuthProvider - Wraps application context mapping active session tokens, listening to auth state changes,
 * and syncing user database profiles.
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [requiresProfileSetup, setRequiresProfileSetup] = useState(false);
  const queryClient = useQueryClient();

  const loadedProfileUserIdRef = useRef<string | null>(null);
  const fetchingProfileRef = useRef<string | null>(null);

  const fetchProfileForUser = useCallback(async (currUser: User, force = false) => {
    if (!force && loadedProfileUserIdRef.current === currUser.id) {
      setLoading(false);
      return;
    }
    if (fetchingProfileRef.current === currUser.id) {
      return;
    }
    fetchingProfileRef.current = currUser.id;
    setLoading(true);
    try {
      const dbProfile = await AuthService.getProfile();
      setProfile(dbProfile);
      setRequiresProfileSetup(false);
      loadedProfileUserIdRef.current = currUser.id;
      queryClient.setQueryData(['profile'], dbProfile);
    } catch (err: any) {
      if (err.response?.status === 404) {
        setProfile(null);
        setRequiresProfileSetup(true);
        loadedProfileUserIdRef.current = currUser.id;
        queryClient.setQueryData(['profile'], null);
      } else {
        console.error('Failed to fetch profile:', err.message);
      }
    } finally {
      setLoading(false);
      fetchingProfileRef.current = null;
    }
  }, [queryClient]);

  const refreshProfile = useCallback(async () => {
    if (user) {
      await fetchProfileForUser(user, true);
    }
  }, [user, fetchProfileForUser]);

  const clearAuthState = useCallback(() => {
    setUser(null);
    setProfile(null);
    setRequiresProfileSetup(false);
    loadedProfileUserIdRef.current = null;
    fetchingProfileRef.current = null;
    queryClient.setQueryData(['profile'], null);
    queryClient.clear();
  }, [queryClient]);

  // Set up Supabase auth listener
  useEffect(() => {
    let isMounted = true;

    // Subscribe to auth state transitions
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!isMounted) return;

      if ((event === 'SIGNED_IN' || event === 'INITIAL_SESSION' || event === 'TOKEN_REFRESHED') && session) {
        setUser(session.user);
        if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
          await fetchProfileForUser(session.user);
        }
      } else if (event === 'SIGNED_OUT' || (event === 'INITIAL_SESSION' && !session)) {
        clearAuthState();
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [fetchProfileForUser, clearAuthState]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setLoading(false);
      throw error;
    }
    if (data.session) {
      setUser(data.session.user);
      await fetchProfileForUser(data.session.user);
    }
  };

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setLoading(false);
      throw error;
    }
    setLoading(false);
    return data.user;
  };

  const logout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      setLoading(false);
      throw error;
    }
    clearAuthState();
    setLoading(false);
  };

  const syncProfile = async (profileData: Omit<UserProfile, 'id' | 'email'>) => {
    setLoading(true);
    try {
      const dbProfile = await AuthService.registerProfile(profileData);
      setProfile(dbProfile);
      setRequiresProfileSetup(false);
      if (user) {
        loadedProfileUserIdRef.current = user.id;
      }
      queryClient.setQueryData(['profile'], dbProfile);
    } finally {
      setLoading(false);
    }
  };

  const sendPasswordReset = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
  };

  const updateUserPassword = async (password: string) => {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) throw error;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        requiresProfileSetup,
        login,
        signUp,
        logout,
        syncProfile,
        sendPasswordReset,
        updateUserPassword,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * useAuth - Hook to consume Supabase session state contexts.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
