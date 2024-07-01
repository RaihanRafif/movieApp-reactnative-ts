/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { AuthContext } from './AuthContext';
import { useTheme } from '@/components/ThemeContext';

const LoginScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const authContext = useContext(AuthContext);
    const { colors } = useTheme();

    const handleLogin = () => {
        if (authContext) {
            authContext.login(email, password);
        }
    };

    const handleSignUp = () => {
        navigation.navigate('Signup');
    };

    useEffect(() => {
        if (authContext?.error) {
            Alert.alert('Login Failed', authContext.error);
        }
    }, [authContext?.error]);

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.loginText, { color: colors.text }]}>Login</Text>
            <TextInput
                style={[styles.input, { color: colors.text, borderColor: colors.tint }]}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={[styles.input, { color: colors.text, marginBottom: 20, borderColor: colors.tint }]}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Logout</Text>
            </TouchableOpacity>

            <Text style={[styles.signupText, { color: colors.text }]}>Has no account?</Text>

            <TouchableOpacity onPress={handleSignUp} style={styles.loginSignUp}>
                <Text style={styles.loginSignUpText}>Logout</Text>
            </TouchableOpacity>
            {/* <Button title="Sign Up" onPress={handleSignUp} /> */}
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
    loginText: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    signupText: {
        marginTop: 20,
        fontSize: 16,
        marginBottom: 10,
    },
    loginButton: {
        backgroundColor: '#007bff',
        borderRadius: 10, 
        paddingVertical: 15,
        paddingHorizontal: 40, 
    },
    loginButtonText: {
        fontSize: 16,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    loginSignUp: {
        backgroundColor: '#007bff',
        borderRadius: 10, 
        paddingVertical: 15,
        paddingHorizontal: 40, 
    },
    loginSignUpText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LoginScreen;
