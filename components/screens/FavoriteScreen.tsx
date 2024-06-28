import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
import { StackActions } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '../ThemeContext'; // Import the useTheme hook

const screenWidth = Dimensions.get('window').width;
const movieContainerWidth = (screenWidth - 40) / 3; // 40 is for padding and margin adjustments

type Movie = {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
};

export default function FavoriteScreen() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigation = useNavigation();
  const { colors } = useTheme(); // Get the colors from the theme

  const getFavorite = async () => {
    try {
      const moviesFavorite = await AsyncStorage.getItem('@FavoriteList');

      if (moviesFavorite) {
        const parsedMovies = JSON.parse(moviesFavorite) as Movie[];
        setMovies(parsedMovies);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getFavorite();
    }, [])
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {movies.length > 0 ? (
        movies.map((movie) => (
          <TouchableOpacity
            key={movie.id}
            onPress={() => {
              navigation.dispatch(StackActions.push('Movie Detail', { id: movie.id }));
            }}
            style={styles.movieContainer}
          >
            <ImageBackground
              resizeMode="cover"
              style={styles.backgroundImage}
              imageStyle={styles.backgroundImageStyle}
              source={{
                uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              }}
            >
              <LinearGradient
                colors={['#00000000', 'rgba(0, 0, 0, 0.7)']}
                locations={[0.6, 0.8]}
                style={styles.gradientStyle}
              >
                <Text style={[styles.movieTitle, { color: colors.text }]}>{movie.title}</Text>
                <View style={styles.ratingContainer}>
                  <FontAwesome name="star" size={16} color="yellow" />
                  <Text style={[styles.rating, { color: colors.text }]}>{movie.vote_average.toFixed(1)}</Text>
                </View>
              </LinearGradient>
            </ImageBackground>
          </TouchableOpacity>
        ))
      ) : (
        <View style={styles.noFavoriteContainer}>
          <Text style={styles.noFavoriteText}>No favorite movies found.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Distribute space between movie containers
  },
  movieContainer: {
    marginBottom: 20,
    width: movieContainerWidth,
  },
  backgroundImage: {
    height: 220,
    justifyContent: 'flex-end',
  },
  backgroundImageStyle: {
    borderRadius: 8,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  gradientStyle: {
    padding: 8,
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
    fontWeight: '700',
    marginLeft: 5,
  },
  noFavoriteContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noFavoriteText: {
    fontSize: 18,
    color: "#a0a0a0",
  },
});
