/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { AuthContext } from './AuthContext';

const LogoutScreen = ({ navigation }: any) => {
    const authContext = useContext(AuthContext);

    const handleLogout = () => {
        if (authContext) {
            authContext.logout(); 
            navigation.navigate('Login'); 
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Logging out...</Text>
            {/* Example: You can add a button to trigger logout */}
            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
};

export default LogoutScreen;
