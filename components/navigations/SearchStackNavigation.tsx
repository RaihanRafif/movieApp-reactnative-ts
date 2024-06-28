import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreen from '../screens/SearchScreen';
import MovieListByCategories from '../movies/MovieListByCategories';
import MovieDetail from '../movies/MovieDetail';
import { RootStackParamList } from '@/constants/RootStackParamList';
// import { useColorScheme } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../ThemeContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

const SearchStackNavigation = () => {
    const { theme, toggleTheme, colors } = useTheme();
    return (
        <Stack.Navigator initialRouteName="Category">
            <Stack.Screen name="Category" component={SearchScreen} options={
                {
                    headerShown: true,
                    headerTitle: 'Search',
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
            } />
            <Stack.Screen name="Movies By Category" component={MovieListByCategories} 
            options={
                {
                    headerShown: true,
                    headerTitle: 'Movies By Category',
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
            <Stack.Screen name="Movie Detail" component={MovieDetail} 
             options={
                {
                    headerShown: true,
                    headerTitle: 'Movie Detail',
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

export default SearchStackNavigation;
