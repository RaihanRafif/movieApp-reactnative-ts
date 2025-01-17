/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { AuthContext } from './AuthContext';
import { useTheme } from '@/components/ThemeContext';


const SignupScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const authContext = useContext(AuthContext);
    const { colors } = useTheme();

    const handleSignup = () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }
        
        if (authContext) {            
            authContext.signup(email, password);
            Alert.alert('Success', 'Registration successful!', [
                {
                    text: 'OK',
                    onPress: () => navigation.navigate('Login'), // Navigate to Login screen on success
                },
            ]);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.signUpText, { color: colors.text }]}>SIGN UP</Text>
            <TextInput
               style={[styles.input, { color: colors.text, borderColor: colors.tint }]}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
               style={[styles.input, { color: colors.text, borderColor: colors.tint }]}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Signup" onPress={handleSignup} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '80%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderRadius: 5,
    },
    signUpText: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default SignupScreen;
