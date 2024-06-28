// NavigationBottom.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import HomeStackNavigation from './HomeStackNavigation';
import SearchStackNavigation from './SearchStackNavigation';
import FavoriteStackNavigation from './FavoriteStackNavigation';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const Tab = createBottomTabNavigator();

const NavigationBottom = () => {
    const colorScheme = useColorScheme();
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                // tabBarInactiveTintColor: '#808080',
                tabBarShowLabel: false,
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeStackNavigation}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Feather name="home" size={28} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Search"
                component={SearchStackNavigation}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Feather name="search" size={28} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Favorite"
                component={FavoriteStackNavigation}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Feather name="heart" size={28} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default NavigationBottom;
