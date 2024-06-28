// CustomHeader.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTheme } from '@/components/ThemeContext';

const CustomHeader: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <View style={[styles.header, { backgroundColor: theme === 'light' ? '#fff' : '#333' }]}>
            <Text style={[styles.title, { color: theme === 'light' ? '#000' : '#fff' }]}>My App</Text>
            <Button title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`} onPress={toggleTheme} />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        height: 60,
    },
    title: {
        fontSize: 20,
    },
});

export default CustomHeader;
