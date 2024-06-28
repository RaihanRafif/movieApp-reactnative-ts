import React from 'react';
import NavigationBottom from '@/components/navigations/NavigationBottom';
import { ThemeProvider } from '@/components/ThemeContext';
import { AuthProvider } from '@/components/screens/authentications/AuthContext';

export default function TabLayout() {

  return (
    <AuthProvider>
      <ThemeProvider>
        <NavigationBottom />
      </ThemeProvider>
    </AuthProvider>
  );
}
