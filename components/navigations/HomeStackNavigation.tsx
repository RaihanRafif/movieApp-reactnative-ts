import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MovieDetail from '../movies/MovieDetail';
import { RootStackParamList } from '@/constants/RootStackParamList';

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeStackNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="Dashboard">
            <Stack.Screen
                name="Dashboard"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Movie Detail"
                component={MovieDetail}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default HomeStackNavigation;
