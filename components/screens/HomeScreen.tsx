import React from 'react';
import { View, StatusBar, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import MovieList from '../movies/MovieList';
import { useTheme } from '../ThemeContext';

type MovieListData = {
    title: string;
    path: string;
    coverType: 'backdrop' | 'poster';
    isCarousel?: boolean;
};

const movieLists: MovieListData[] = [
    {
        title: 'Now Playing in Theater',
        path: 'movie/now_playing?language=en-US&page=1',
        coverType: 'backdrop',
        isCarousel: true,
    },
    {
        title: 'Upcoming Movies',
        path: 'movie/upcoming?language=en-US&page=1',
        coverType: 'poster',
    },
    {
        title: 'Top Rated Movies',
        path: 'movie/top_rated?language=en-US&page=1',
        coverType: 'poster',
    },
    {
        title: 'Popular Movies',
        path: 'movie/popular?language=en-US&page=1',
        coverType: 'poster',
    },
];

const HomeScreen = () => {
    const { colors } = useTheme();

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {movieLists.map((movieList) => (
                    <View key={movieList.title} style={styles.movieListContainer}>
                        <MovieList
                            title={movieList.title}
                            path={movieList.path}
                            coverType={movieList.coverType}
                        />
                    </View>
                ))}
            </ScrollView>
            <StatusBar translucent={false} backgroundColor={colors.background} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        paddingVertical: 16,
        alignItems: 'center',
    },
    movieListContainer: {
        marginBottom: 16,
        width: '100%',
    },
});

export default HomeScreen;
