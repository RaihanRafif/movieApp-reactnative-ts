import React from 'react';
import { View, StatusBar, StyleSheet, SafeAreaView, ScrollView, } from 'react-native';
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
            <StatusBar translucent backgroundColor={colors.background} />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {movieLists.map((movieList) => (
                    <View key={movieList.title} style={styles.movieListContainer}>
                        {/* Example header styling */}
                        <MovieList
                            title={movieList.title}
                            path={movieList.path}
                            coverType={movieList.coverType}
                        />
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    scrollContainer: {
        paddingVertical: 16,
        alignItems: 'center',
    },
    movieListContainer: {
        marginBottom: 16,
        width: '100%',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        paddingHorizontal: 16,
    },
    purpleLabel: {
        width: 8,
        height: 8,
        backgroundColor: '#6B3EFF',
        marginRight: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
