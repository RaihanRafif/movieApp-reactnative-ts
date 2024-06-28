import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FavoriteScreen from '../screens/FavoriteScreen';
import MovieDetail from '../movies/MovieDetail';
import { RootStackParamList } from '@/constants/RootStackParamList';
import { useTheme } from '../ThemeContext';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';


const Stack = createNativeStackNavigator<RootStackParamList>();

const FavoriteStackNavigation = () => {
    const { theme, toggleTheme, colors } = useTheme();
    return (
        <Stack.Navigator initialRouteName="FavoriteMain">
            <Stack.Screen name="FavoriteMain" component={FavoriteScreen} 
            options={
                {
                    headerShown: true,
                    headerTitle: 'Favorite',
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
            <Stack.Screen name="Movie Detail" component={MovieDetail} />
        </Stack.Navigator>
    );
}

export default FavoriteStackNavigation;
