import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MovieDetail from '../movies/MovieDetail';
import { RootStackParamList } from '@/constants/RootStackParamList';
import { useTheme } from '../ThemeContext';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeStackNavigation = () => {
  const { theme, toggleTheme, colors } = useTheme();

  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen
        name="Dashboard"
        component={HomeScreen}
        options={{
          headerShown: true,
          headerTitle: 'Home',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerRight: () => (
            <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 16 }}>
              <Feather name={theme === 'light' ? 'moon' : 'sun'} size={24} color={colors.text} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Movie Detail"
        component={MovieDetail}
        options={
            {
                headerShown: true,
                headerTitle: 'Movie',
                headerStyle: {
                  backgroundColor: colors.background,
                },
                headerTintColor: colors.text,
                headerRight: () => (
                  <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 16 }}>
                    <Feather name={theme === 'light' ? 'moon' : 'sun'} size={24} color={colors.text} />
                  </TouchableOpacity>
                ),
              }
        }
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigation;
