import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NavigationBottom from './navigations/NavigationBottom';

export default function HomeScreen() {
  return (
    <NavigationContainer>
      <NavigationBottom />
    </NavigationContainer>
  );
}