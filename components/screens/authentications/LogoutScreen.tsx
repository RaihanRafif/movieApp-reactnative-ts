import React, { useContext } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AuthContext } from './AuthContext';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';

type RootStackParamList = {
    Home: undefined;
    Search: undefined;
    Favorite: undefined;
    Auth: undefined;
    Logout: undefined;
};

const LogoutScreen = () => {
    const authContext = useContext(AuthContext);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleLogout = async () => {
        if (authContext) {
            await authContext.logout();
            navigation.dispatch(StackActions.replace('Dashboard')); // Ensure 'Home' is correctly defined
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoutButton: {
        backgroundColor: '#007bff',
        borderRadius: 10, 
        paddingVertical: 15,
        paddingHorizontal: 40, 
    },
    logoutButtonText: {
        fontSize: 16,
        color: '#ffffff',
        fontWeight: 'bold',
    },
});

export default LogoutScreen;