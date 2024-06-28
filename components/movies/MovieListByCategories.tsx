import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, StackActions, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/constants/RootStackParamList';

type Movie = {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
};

type MovieListByCategoriesProps = {
    route: RouteProp<RootStackParamList, 'Movies By Category'>;
};

const MovieListByCategories: React.FC<MovieListByCategoriesProps> = ({ route }) => {
    const { categoryId } = route.params;
    const [movies, setMovies] = useState<Movie[]>([]);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    useEffect(() => {
        fetchMovies();
    }, [categoryId]);

    const fetchMovies = async () => {
        const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${categoryId}`;

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_ACCESS_TOKEN}`,
            },
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            setMovies(data.results);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const renderItem = ({ item }: { item: Movie }) => (
        <TouchableOpacity
            onPress={() => {
                navigation.dispatch(StackActions.push('Movie Detail', { id: item.id }));
            }}
            style={styles.movieContainer}
        >
            <View>
                <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                    style={styles.poster}
                />
                <View style={styles.overlay}>
                    <Text style={styles.movieTitle}>{item.title}</Text>
                    <Text style={styles.movieRating}>Rating: {item.vote_average.toFixed(1)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={movies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                numColumns={3}
                columnWrapperStyle={styles.row}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    backButton: {
        padding: 10,
        backgroundColor: '#8978A4',
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    backButtonText: {
        color: 'white',
        fontSize: 18,
    },
    row: {
        justifyContent: 'space-between',
    },
    movieContainer: {
        flex: 1,
        margin: 5,
        position: 'relative',
    },
    poster: {
        width: '100%',
        aspectRatio: 2 / 3, // Ensures the image retains a 2:3 ratio
        borderRadius: 5,
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    movieTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
    },
    movieRating: {
        fontSize: 12,
        color: 'white',
    },
});

export default MovieListByCategories;
