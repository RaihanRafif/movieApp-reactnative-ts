import React, { useContext } from 'react';
import { View, Button, StyleSheet } from 'react-native';
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
            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LogoutScreen;
