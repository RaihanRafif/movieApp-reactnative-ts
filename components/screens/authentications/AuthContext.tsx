import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
  user: string | null;
  error: string | null;
  login: (email: string, password: string) => void;
  signup: (email: string, password: string) => void;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: React.ReactNode; // Define the type for children
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      const storedUser = await AsyncStorage.getItem('@user');
      if (storedUser) {
        setUser(storedUser);
      }
    };

    loadUserData();
  }, []);

  const login = async (email: string, password: string) => {
    const storedUser = await AsyncStorage.getItem('@user');

    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.email === email && userData.password === password) {
        setUser(email);
        setError(null);
        await AsyncStorage.setItem('@currentUser', email);
      } else {
        setError('Invalid email or password');
      }
    } else {
      setError('No user found');
    }
  };

  const signup = async (email: string, password: string) => {
    const userData = { email, password };
    await AsyncStorage.setItem('@user', JSON.stringify(userData));
    setUser(email);
    setError(null);
    await AsyncStorage.setItem('@currentUser', email);
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('@currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, error, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
