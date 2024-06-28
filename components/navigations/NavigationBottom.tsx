import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import HomeStackNavigation from './HomeStackNavigation';
import SearchStackNavigation from './SearchStackNavigation';
import FavoriteStackNavigation from './FavoriteStackNavigation';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import LoginScreen from '../screens/authentications/LoginScreen';
import { AuthContext } from '../screens/authentications/AuthContext';
import SignupScreen from '../screens/authentications/SignupScreen';
import LogoutScreen from '../screens/authentications/LogoutScreen';

const Tab = createBottomTabNavigator();

const NavigationBottom = () => {
    const colorScheme = useColorScheme();
    const authContext = useContext(AuthContext); // Access AuthContext for authentication state

    if (!authContext) {
        // Handle case where authContext is null
        return null; // Or return a loading indicator, error message, or handle appropriately
    }

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
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
            {!authContext.user ? (
                <>
                    <Tab.Screen
                        name="Signup"
                        component={SignupScreen}
                        options={{
                            tabBarIcon: ({ color }) => (
                                <Feather name="user-plus" size={28} color={color} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{
                            tabBarIcon: ({ color }) => (
                                <Feather name="log-in" size={28} color={color} />
                            ),
                        }}
                    />
                </>
            ) : (
                <Tab.Screen
                    name="Logout"
                    component={LogoutScreen} // Use a LogoutScreen component for logout handling
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Feather name="log-out" size={28} color={color} />
                        ),
                    }}
                />
            )}
        </Tab.Navigator>
    );
};

export default NavigationBottom;
