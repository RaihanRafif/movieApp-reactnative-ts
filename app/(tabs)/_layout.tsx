import React from 'react';
import NavigationBottom from '@/components/navigations/NavigationBottom';
import { ThemeProvider } from '@/components/ThemeContext';

export default function TabLayout() {

  return (
    <ThemeProvider>
      <NavigationBottom />
    </ThemeProvider>
  );
}
