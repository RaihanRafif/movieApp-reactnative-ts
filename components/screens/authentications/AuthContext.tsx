import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
  user: string | null;
  login: (email: string, password: string) => void;
  signup: (email: string, password: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: React.ReactNode; // Define the type for children
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);

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
        await AsyncStorage.setItem('@currentUser', email);
      }
    }
  };

  const signup = async (email: string, password: string) => {
    console.log("3333");

    const userData = { email, password };
    await AsyncStorage.setItem('@user', JSON.stringify(userData));
    setUser(email);
    await AsyncStorage.setItem('@currentUser', email);
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('@currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
