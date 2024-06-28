import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const KeywordSearchScreen: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [movies, setMovies] = useState<any[]>([]);
    const navigation = useNavigation();

    useEffect(() => {
        const searchTimeout = setTimeout(() => {
            if (query.length > 2) {
                searchMovies(query);
            } else {
                setMovies([]);
            }
        }, 300);

        return () => clearTimeout(searchTimeout);
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
            setMovies(data.results || []);
        } catch (error) {
            console.log('Error fetching movies:', error);
        }
    };

    const renderMovieItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={styles.movieContainer}
            onPress={() => navigation.navigate('Movie Detail', { id: item.id })}
        >
            <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
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
                onChangeText={setQuery}
            />
            <FlatList
                data={movies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderMovieItem}
                ListEmptyComponent={<Text style={styles.noFavoriteMovies}>No movies found</Text>}
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
    noFavoriteMovies: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
    },
});

export default KeywordSearchScreen;
