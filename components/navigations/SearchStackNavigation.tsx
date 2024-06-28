import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreen from '../screens/SearchScreen';
import MovieListByCategories from '../movies/MovieListByCategories';
import MovieDetail from '../movies/MovieDetail';
import { RootStackParamList } from '@/constants/RootStackParamList';

const Stack = createNativeStackNavigator<RootStackParamList>();

const SearchStackNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="Category">
            <Stack.Screen name="Category" component={SearchScreen} />
            <Stack.Screen name="Movies By Category" component={MovieListByCategories} />
            <Stack.Screen name="Movie Detail" component={MovieDetail} />
        </Stack.Navigator>
    );
};

export default SearchStackNavigation;
