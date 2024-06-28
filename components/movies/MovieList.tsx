import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import MovieItem from './MovieItem';
import { useTheme } from '../ThemeContext'; // Adjust the import path based on your project structure

type Movie = {
    id: number;
    poster_path: string;
    backdrop_path: string;
    title: string;
    vote_average: number;
};

type MovieListProps = {
    title: string;
    path: string;
    coverType: 'backdrop' | 'poster';
};

const coverImageSize = {
    backdrop: {
        width: 280,
        height: 160,
    },
    poster: {
        width: 200,
        height: 300,
    },
};

const MovieList: React.FC<MovieListProps> = ({ title, path, coverType }) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const { colors } = useTheme(); // Accessing theme colors

    useEffect(() => {
        getMovieList();
    }, []);

    const getMovieList = async () => {
        try {
            const url = `https://api.themoviedb.org/3/${path}`;
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_ACCESS_TOKEN}`,
                },
            };
            const response = await fetch(url, options);
            const data = await response.json();
            setMovies(data.results);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    return (
        <View>
            <View style={styles.header}>
                <View style={[styles.purpleLabel, { backgroundColor: colors.icon }]}></View>
                <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
            </View>
            <FlatList
                style={{
                    ...styles.movieList,
                    maxHeight: coverImageSize[coverType].height,
                }}
                showsHorizontalScrollIndicator={false}
                horizontal
                data={movies}
                renderItem={({ item }) => (
                    <MovieItem
                        movie={item}
                        size={coverImageSize[coverType]}
                        coverType={coverType}
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        marginLeft: 6,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    purpleLabel: {
        width: 20,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    title: {
        fontSize: 20,
        fontWeight: '900',
    },
    movieList: {
        paddingLeft: 4,
        marginTop: 8,
    },
});

export default MovieList;
