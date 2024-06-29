import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Movie = {
    id: number;
    poster_path: string | null;
    title: string;
    vote_average: number;
};

type RootStackParamList = {
    'Movies By Category': { id: string };
    'Movie Detail': { id: number }; // Define 'Movie Detail' screen with id as number
};

const KeywordSearchScreen = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState<Movie[]>([]);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>(); // No need to specify <RootStackParamList>, it's inferred

    useEffect(() => {
        if (query.length > 2) {
            searchMovies(query);
        } else {
            setMovies([]);
        }
    }, [query]);

    const searchMovies = async (searchQuery: string) => {
        try {
            const url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}`;
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_ACCESS_TOKEN}`,
                }
            };

            const response = await fetch(url, options);
            const data = await response.json();
            if (data.results) {
                // Asserting data.results to be an array of Movie
                setMovies(data.results as Movie[]);
            } else {
                setMovies([]);
            }
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const renderMovieItem = ({ item }: { item: Movie }) => (
        <TouchableOpacity
            style={styles.movieContainer}
            onPress={() => {
                navigation.navigate('Movie Detail', { id: item.id }); // Use navigation object to navigate
            }}
        >
            <Image
                source={{ uri: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : 'https://via.placeholder.com/50x75.png?text=No+Image' }}
                style={styles.poster}
            />
            <View style={styles.movieInfo}>
                <Text style={styles.movieTitle}>{item.title}</Text>
                <Text style={styles.movieRating}>Rating: {item.vote_average.toFixed(1)}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search by title"
                value={query}
                onChangeText={(text) => {
                    setQuery(text);
                    searchMovies(text); // Use text instead of query here
                }}
            />
            <FlatList
                data={movies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderMovieItem}
                ListEmptyComponent={<Text style={styles.noMovieTitle}>No movies found.</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    movieContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
    },
    poster: {
        width: 50,
        height: 75,
        borderRadius: 5,
        marginRight: 10,
    },
    movieInfo: {
        flex: 1,
    },
    movieTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    movieRating: {
        fontSize: 14,
        color: '#666',
    },
    noMovieTitle: {
        fontSize: 18,
        color: "#a0a0a0",
        textAlign: 'center',
    },
});

export default KeywordSearchScreen;
