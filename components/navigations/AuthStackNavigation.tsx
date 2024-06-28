import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/authentications/LoginScreen';
import SignupScreen from '../screens/authentications/SignupScreen';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../ThemeContext';

const Stack = createNativeStackNavigator();

const AuthStackNavigation = () => {
    const { theme, toggleTheme, colors } = useTheme();
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: colors.background,
                    },
                    headerTitle: '',
                    headerTintColor: colors.text,
                    headerRight: () => (
                        <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 16 }}>
                            <Feather name={theme === 'light' ? 'moon' : 'sun'} size={24} color={colors.text} />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Stack.Screen
                name="Signup"
                component={SignupScreen}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: colors.background,
                    },
                    headerTitle: '',
                    headerTintColor: colors.text,
                    headerRight: () => (
                        <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 16 }}>
                            <Feather name={theme === 'light' ? 'moon' : 'sun'} size={24} color={colors.text} />
                        </TouchableOpacity>
                    ),
                }}
            />
        </Stack.Navigator>
    );
};

export default AuthStackNavigation;
