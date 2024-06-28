import React from 'react';
import { ImageBackground, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';

type MovieItemProps = {
    movie: {
        id: number;
        title: string;
        vote_average: number;
        backdrop_path: string;
        poster_path: string;
    };
    size: {
        width: number;
        height: number;
    };
    coverType: 'backdrop' | 'poster';
};

const MovieItem: React.FC<MovieItemProps> = ({ movie, size, coverType }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => {
                navigation.dispatch(StackActions.push('Movie Detail', { id: movie.id }));
            }}
        >
            <ImageBackground
                resizeMode="cover"
                style={[size, styles.backgroundImage]}
                imageStyle={styles.backgroundImageStyle}
                source={{
                    uri: `https://image.tmdb.org/t/p/w500${coverType === 'backdrop' ? movie.backdrop_path : movie.poster_path}`,
                }}
            >
                <LinearGradient
                    colors={['#00000000', 'rgba(0, 0, 0, 0.7)']}
                    locations={[0.6, 0.8]}
                    style={styles.gradientStyle}
                >
                    <Text style={styles.movieTitle}>{movie.title}</Text>
                    <View style={styles.ratingContainer}>
                        <FontAwesome name="star" size={16} color="yellow" />
                        <Text style={styles.rating}>{movie.vote_average.toFixed(1)}</Text>
                    </View>
                </LinearGradient>
            </ImageBackground>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        marginRight: 4,
    },
    backgroundImageStyle: {
        borderRadius: 8,
    },
    movieTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'semibold',
    },
    gradientStyle: {
        padding: 8,
        height: '100%',
        width: '100%',
        borderRadius: 8,
        display: 'flex',
        justifyContent: 'flex-end',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },
    rating: {
        color: 'yellow',
        fontWeight: '700',
    },
});

export default MovieItem;
