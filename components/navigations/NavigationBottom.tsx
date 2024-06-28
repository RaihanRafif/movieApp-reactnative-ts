import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import HomeStackNavigation from './HomeStackNavigation';
import SearchStackNavigation from './SearchStackNavigation';
import FavoriteStackNavigation from './FavoriteStackNavigation';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthContext } from '../screens/authentications/AuthContext';
import AuthStackNavigation from './AuthStackNavigation';
import LogoutScreen from '../screens/authentications/LogoutScreen';

const Tab = createBottomTabNavigator();

const NavigationBottom = () => {
    const colorScheme = useColorScheme();
    const authContext = useContext(AuthContext);

    if (!authContext) {
        return null;
    }

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                tabBarShowLabel: false,
                tabBarStyle: {
                    display: "flex",
                    alignItems: "center",
                    paddingTop: 10,
                    paddingBottom: 10,
                    height: 60,
                },
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
                <Tab.Screen
                    name="Auth"
                    component={AuthStackNavigation}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Feather name="user" size={28} color={color} />
                        ),
                    }}
                />
            ) : (
                <Tab.Screen
                    name="Logout"
                    component={LogoutScreen}
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
